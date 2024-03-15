import React, {
  ElementType,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import CommonDialog from 'components/common/CommonDialog';
import Menu from 'components/Menu';
import TopBar from 'components/TopBar';
import { isUndefined } from 'lodash';
import { useSelector } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  RouteProps,
  useLocation,
} from 'react-router-dom';
import { getDialogState, scrollState } from 'store/selectors';
import { ALL_CATEGORIES, clientRoutesEnum } from 'enums/routes';
import { SecureStorageEnum } from 'enums/auth';
import secureStorage from 'utils/secureStorage';
import CommonSnackBar from 'components/common/CommonSnack';
import SearchModal from 'components/Menu/SearchModal/SearchModal';
import { useStyles } from './styles';

export interface DashboardLayoutProps extends RouteProps {
  RenderComponent: ElementType;
}

interface LayoutProps {
  routeProps: RouteComponentProps;
  RenderComponent: ElementType;
  path?: string | string[];
}

const Layout = (props: LayoutProps) => {
  const { routeProps, RenderComponent } = props;
  const dialog = useSelector(getDialogState);
  const [isDisplaySubmenu, setIsDisplaySubmenu] = useState(false);
  const [isDeadzone, setIsDeadzone] = useState(false);
  const location = useLocation();
  const isScrolling = useSelector(scrollState);
  const [isDisplaySearchModal, setIsDisplaySearchModal] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const classes = useStyles({
    isScrolling,
    isHome: ALL_CATEGORIES.includes(location.pathname),
    isDeadzone,
    isDesktop,
  });

  const onSearchModal = useCallback(() => {
    setIsDisplaySearchModal(true);
  }, []);

  const offSearchModal = useCallback(() => {
    setIsDisplaySearchModal(false);
  }, []);

  const toggleSubmenu = () => {
    setIsDisplaySubmenu(!isDisplaySubmenu);
  };
  const toggleDeadzone = (value?: boolean) => {
    if (!isUndefined(value)) {
      window.deadzone = value;
      setIsDeadzone(value);
    } else {
      window.deadzone = !isDeadzone;
      setIsDeadzone(!isDeadzone);
    }
  };

  const isStyleHome = useMemo(() => {
    return (
      ALL_CATEGORIES.includes(location.pathname) ||
      location.pathname === '/categories'
    );
  }, [location.pathname]);

  const isStyleDetailNFT = useMemo(() => {
    return location.pathname === '/detail-nfts';
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div
      className={clsx(classes.main, {
        [classes.home]: isStyleHome,
        [classes.detail]: isStyleDetailNFT,
      })}
    >
      <TopBar isDeadzone={isDeadzone} />
      <Menu
        displayModal={toggleSubmenu}
        isDeadzone={isDeadzone}
        onSearchModal={onSearchModal}
        offSearchModal={offSearchModal}
      />
      <RenderComponent
        {...routeProps}
        isDeadzone={isDeadzone}
        toggleDeadzone={toggleDeadzone}
      />
      <CommonDialog>
        {dialog.component && (
          <>
            <dialog.component />
          </>
        )}
      </CommonDialog>
      {!dialog.open && <CommonSnackBar />}
    </div>
  );
};

const DashBoardLayout = ({
  RenderComponent,
  ...rest
}: DashboardLayoutProps) => {
  const render = useCallback(
    (routeProps: RouteComponentProps) => {
      if (rest.path === clientRoutesEnum.USER_PAGE) {
        const account = JSON.parse(
          secureStorage.getItem(SecureStorageEnum.ACCOUNT) || '{}',
        );
        if (account && account.isAdmin) {
          window.location.href = '/';
          secureStorage.removeItem(SecureStorageEnum.ACCESS_TOKEN);
          secureStorage.removeItem(SecureStorageEnum.REFRESH_TOKEN);
          secureStorage.removeItem(SecureStorageEnum.ACCOUNT);
          return;
        }
      }
      return (
        <Layout
          routeProps={routeProps}
          RenderComponent={RenderComponent}
          path={rest.path as any}
        />
      );
    },
    [RenderComponent, rest.path],
  );

  return <Route {...rest} render={render} />;
};

export default DashBoardLayout;
