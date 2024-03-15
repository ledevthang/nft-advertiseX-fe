import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import TextMessageDialog from 'components/Dialog/TextMessageDialog';
import ConfrimPopup from 'components/Popup/ConfirmPopup';
import AddIcon from 'icons/AddIcon';
import ContentCopy from 'icons/ContentCopy';
import DeleteIcon from 'icons/DeleteIcon';
import EditIcon from 'icons/EditIcon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import nftsService from 'services/nfts';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import {
  addCategoriesToEstimate,
  createNFT,
  deleteNFT,
  getNFTPreviewSuccessAction,
} from 'store/actions/nftActions';
import { updateSysMessageAction } from 'store/actions/systemMessageActions';
import { CategoryWithinParsedLink } from 'types/category';
import { NFT } from 'types/nft';

interface INFTAction {
  data: NFT;
  isDefault?: boolean;
  className?: string;
  isActive: boolean;
}

interface IStyle {
  isDefault: boolean | undefined;
  isActive: boolean;
}

const NFTAction = ({ data, isDefault, className, isActive }: INFTAction) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useHistory();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const callback = (success: boolean, totalClonedItem?: number) => {
    console.log('callback running: ', success, totalClonedItem);
    if (success && !isDesktop) {
      // eslint-disable-next-line
      dispatch(
        updateSysMessageAction({
          open: true,
          message: `Clone ${totalClonedItem} created successfully`,
          status: 'success',
        }),
      );
    }
    if (!success) {
      if (isDesktop) {
        dispatch(
          updateDialogStateAction({
            open: true,
            component: TextMessageDialog,
          }),
        );
      } else {
        dispatch(
          updateSysMessageAction({
            open: true,
            message: 'Max number of clones per item reached',
            status: 'error',
          }),
        );
      }
    }
  };

  const deleteCallback = (success: boolean) => {
    if (success && !isDesktop) {
      history.push('/user');
    } else if (!success && !isDesktop) {
      dispatch(
        updateSysMessageAction({
          open: true,
          message: 'Some error has occurred',
          status: 'error',
        }),
      );
    }
  };

  const handleDelete = () => {
    dispatch(deleteNFT(`${data.id}`, deleteCallback, isDesktop));
  };

  const onDeleteNFT = () => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: ConfrimPopup,
        props: {
          callback: handleDelete,
          text: 'Are you sure you want\nto delete this NFT?',
          subTitle: 'This action cannot be undone.',
        },
      }),
    );
  };

  const onCloneNFT = async (e: any) => {
    e.preventDefault();
    try {
      const nft = await nftsService.GetNFTDetail({
        nftId: data.id.toString(),
      });

      if (nft?.categories?.length > 0) {
        const categoriesOnNft = nft.categories.map((cate) => cate.name);
        dispatch(
          createNFT(
            {
              tokenId: data.tokenId,
              tokenAddress: data.tokenAddress,
              chain: data.chain,
              marketplace: data.marketplace,
              isCloneFromUser: true,
              time: 0,
              categoriesOnNft,
            },
            callback,
            isDesktop,
          ),
        );
      }
    } catch (error) {}
  };

  const onEditNFT = () => {
    if (history.location.pathname.includes('edit-nft')) return;
    history.push(`/edit-nft/${data.id}`);
  };

  const onAddNewNFT = async () => {
    try {
      const nft = await nftsService.GetNFTDetail({
        nftId: data.id.toString(),
      });

      const categories: CategoryWithinParsedLink[] | undefined =
        nft?.categories?.map((cat) => ({
          imgUrl: cat.imgUrl,
          name: cat.name,
          totalItem: cat.totalItem,
        }));
      categories && dispatch(addCategoriesToEstimate(categories));

      dispatch(
        getNFTPreviewSuccessAction({
          ...data,
          categories: (categories as any) || [],
          shouldEstimate: true,
        }),
      );
      history.push('/add-nft', { from: 'user-page' });
    } catch (error) {}
  };

  const classes = useStyles({ isDefault, isActive: data.isActive });

  return (
    <Box className={clsx(classes.main, className)}>
      <Box onClick={onCloneNFT}>
        <ContentCopy color={isDefault && isActive ? '#100113' : '#6F6BC5'} />
      </Box>
      {data.isActive ? (
        <Box onClick={onEditNFT}>
          <EditIcon color={isDefault && isActive ? '#100113' : '#FFFFFF'} />
        </Box>
      ) : (
        <Box onClick={onAddNewNFT}>
          <AddIcon color={isDefault && isActive ? '#100113' : '#FFFFFF'} />
        </Box>
      )}
      <Box onClick={onDeleteNFT}>
        <DeleteIcon color={isDefault && isActive ? '#100113' : '#FFFFFF'} />
      </Box>
    </Box>
  );
};

export default NFTAction;

const useStyles = makeStyles((theme) => ({
  main: {
    '& div:nth-child(3)': {
      '&:hover': {
        backgroundColor: ({ isDefault, isActive }: IStyle) =>
          isDefault && isActive ? '#100113 !important' : '#FFFFFF !important',
        '& svg>path': {
          fill: ({ isDefault, isActive }: IStyle) =>
            isDefault && isActive ? '#DDE542 !important' : '#6F6BC5',
        },
      },
    },
    '& div:nth-child(2)': {
      '&:hover': {
        backgroundColor: ({ isDefault, isActive }: IStyle) =>
          isDefault && isActive ? '#100113 !important' : '#FFFFFF !important',
        '& svg>path': {
          stroke: ({
            isDefault,
            isActive,
          }: {
            isDefault?: boolean;
            isActive: boolean;
          }) =>
            isDefault && isActive ? '#DDE542 !important' : '#6F6BC5 !important',
          fill: ({ isDefault, isActive }: IStyle) =>
            isDefault && isActive ? '#DDE542 !important' : '#6F6BC5 !important',
        },
      },
    },
    '& div:first-child': {
      '&:hover': {
        backgroundColor: ({ isDefault, isActive }: IStyle) =>
          isDefault && isActive ? '#100113 !important' : '#6F6BC5 !important',
        '& svg>path': {
          fill: ({ isDefault, isActive }: IStyle) =>
            isDefault && isActive ? '#DDE542 !important' : '#FFFFFF',
        },
      },
    },
  },
}));
