/* eslint-disable */
import React, { useEffect } from 'react';
import AddNFT from 'containers/AddNFT';
import UserPage from 'containers/User';
import DetailNFTPage from 'containers/DetailNFT';
import Home from 'containers/Home';
import NFTsDetailTablet from 'containers/NFTsTablet';
import EditNFT from 'containers/EditNFT';
import { ALL_CATEGORIES, clientRoutesEnum } from 'enums/routes';
import DashBoardLayout from 'layouts/DashBoardLayout';
import { Switch } from 'react-router-dom';

import { getUserState } from 'store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { logoutUserAction } from 'store/actions/userActions';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import WarningEditPopup from 'components/Popup/WarningEditPopup';
import { getUserAction } from 'store/actions/userActions';
import { useHistory } from 'react-router-dom';
import PageHomeContainer from 'containers/PageHome';

function AppRoutes() {
  const user = useSelector(getUserState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { deactivate } = useWeb3React();
  const onLogout = () => {
    deactivate();
    dispatch(logoutUserAction());
    dispatch(
      updateDialogStateAction({
        open: true,
        component: WarningEditPopup,
        props: {
          text: 'This wallet has been blocked due to inappropriate conduct.\nContact us if you think this is a mistake.',
          buttonText: 'Agree',
        },
      }),
    );
    if (history.location.pathname == '/user') {
      history.push('/');
    }
  };

  useEffect(() => {
    if (!user.user) {
      return;
    }
    const timerId = setInterval(() => {
      dispatch(getUserAction());
    }, 180000);
    return () => {
      clearInterval(timerId);
    };
  }, [user]);

  useEffect(() => {
    if (user.user?.isBlocked) onLogout();
  }, [user]);

  return (
    <Switch>
      <DashBoardLayout
        exact
        path={clientRoutesEnum.HOME}
        RenderComponent={PageHomeContainer}
      />
      <DashBoardLayout
        exact
        path={clientRoutesEnum.ADD_NFT}
        RenderComponent={AddNFT}
      />
      <DashBoardLayout
        exact
        path={clientRoutesEnum.USER_PAGE}
        RenderComponent={UserPage}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.MY_DETAIL_NFT}
        RenderComponent={DetailNFTPage}
      />
      <DashBoardLayout
        exact={true}
        path={clientRoutesEnum.DETAIL_NFTS}
        RenderComponent={NFTsDetailTablet}
      />
      <DashBoardLayout
        exact={true}
        path={clientRoutesEnum.EDIT_NFT}
        RenderComponent={EditNFT}
      />

      <DashBoardLayout exact path={ALL_CATEGORIES} RenderComponent={Home} />
    </Switch>
  );
}

export default AppRoutes;
