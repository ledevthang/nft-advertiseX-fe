import { DispatchType } from 'types/store';
import {
  NFTsActionTypeEnum,
  AddNftActionTypeEnum,
  EditNFTActionTypeEnum,
} from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import nftService from 'services/nfts';
import { ApiError } from 'types/api';
import {
  CreateNFT,
  GetMyNFTRequest,
  GetNFTDetailRequest,
  NFT,
  NFTGetAllRequest,
  NFTEstimateResponse,
} from '../../types/nft';
import {
  asyncTaskStartAction,
  asyncTaskStopAction,
  ayncTaskResetAction,
} from './asyncTaskActions';
import { convertLinkToNFTParams, hasMore } from 'common/helper';
import { GetNftEstimateParams, PriceNFTBaseOnDollar } from 'types/addNft';
import { RootStateType } from 'types/store';
import { validateEstimateTime } from 'utils/validateAddNFT';
import { InputEstimateParamsEnum } from 'enums/addNft';
import { isNil, isEmpty } from 'lodash';
import { updateDialogStateAction } from './dialogActions';
import CommonSuccessDialog from 'components/Dialog/CommonSuccessDialog';
import CommonFailedDialog from 'components/Dialog/CommonFailedDialog';
import { mapLabelToValue } from 'enums/filter';
import { SUPPORT_CONTENT_TYPE } from 'common/constant';
import miniumPriceService from 'services/miniumPrice';
// import summarizeSvc from 'services/summarize';
import { CategoryWithinParsedLink } from 'types/category';
import { CategoriesName } from 'enums/categories';

export const getNFTsSuccessAction = (payload: PaginationData<NFT>) => ({
  type: NFTsActionTypeEnum.GET_NFTS,
  payload,
});

export const getNFTsBeforeSuccessAction = (
  payload: PaginationData<NFT> & { pageBefore: number },
) => ({
  type: NFTsActionTypeEnum.GET_NFTS_BEFORE,
  payload,
});

export const getNFTsSuccessAtFirstAction = (
  payload: PaginationData<NFT> & { pageBefore: number },
) => ({
  type: NFTsActionTypeEnum.GET_NFTS_TABLET_AT_FIRST,
  payload,
});

export const getNFTPreviewSuccessAction = (payload: NFT) => ({
  type: NFTsActionTypeEnum.GET_NFT_PREVIEW,
  payload,
});

export const getNFTPreviewFailureAction = () => ({
  type: NFTsActionTypeEnum.GET_NFT_PREVIEW,
  payload: null,
});

export const getNFTDetailSuccessAction = (payload: NFT) => ({
  type: NFTsActionTypeEnum.GET_NFT_DETAIL,
  payload,
});

export const getMyNFTsSuccessAction = (payload: PaginationData<NFT>) => ({
  type: NFTsActionTypeEnum.GET_MY_NFTS,
  payload,
});

export const deleteSuccessMyNFT = (payload: PaginationData<NFT>) => ({
  type: NFTsActionTypeEnum.DELETE_MY_NFTS,
  payload,
});

export const addNFTSuccessAction = (payload: PaginationData<NFT>) => ({
  type: NFTsActionTypeEnum.CREATE_NEW_NFT,
  payload,
});

export const getNFTsAction = (
  params: NFTGetAllRequest,
  callback?: () => void,
) => {
  const taskId = NFTsActionTypeEnum.GET_NFTS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await nftService.GetNFTs({
        ...params,
        isActive: true,
      });

      dispatch(getNFTsSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
      callback && callback();
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getNFTsActionScrollHorizontal = (
  loadAfter: boolean,
  callback?: () => void,
) => {
  const taskId = NFTsActionTypeEnum.GET_NFTS;
  return async (dispatch: DispatchType, getState: () => any): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const nftsReducer = getState().nftsReducer;
      const pageNumber = nftsReducer.pageNumber;
      const pageSize = nftsReducer.pageSize;
      const pageSizeBefore = nftsReducer.pageBefore;
      const total = nftsReducer.total;

      const loadMore = loadAfter
        ? hasMore({ pageNumber, pageSize, total })
        : pageSizeBefore > 1;

      if (loadMore) {
        const filter = getState().filterReducer;
        const data = await nftService.GetNFTs({
          pageNumber: loadAfter ? pageNumber + 1 : pageSizeBefore - 1,
          pageSize,
          categories: filter.categories,
          filterBy: (mapLabelToValue as any)[filter.price[0]] || 'Position',
          chains: filter.chains.map((c: any) => c.toLowerCase()),
          collectionIds: filter.collectionIds,
          blockNumber: filter.blockNumber,
          isActive: true,
        });
        dispatch(
          loadAfter
            ? getNFTsSuccessAction(data)
            : getNFTsBeforeSuccessAction({
                ...data,
                pageNumber,
                pageBefore: pageSizeBefore - 1,
              }),
        );
      }
      dispatch(asyncTaskStopAction(taskId));
      callback && callback();
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getNFTsHorizontalAtFirst = (
  index: number,
  categories: string,
  callback?: () => void,
) => {
  const taskId = NFTsActionTypeEnum.GET_NFTS;
  return async (dispatch: DispatchType, getState: () => any): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const pageNumber =
        index % 10 === 0 ? index / 10 : Math.floor(index / 10) + 1;
      const filter = getState().filterReducer;
      const data = await nftService.GetNFTs({
        pageNumber,
        pageSize: 10,
        categories,
        filterBy: (mapLabelToValue as any)[filter.price[0]] || 'Position',
        chains: filter.chains.map((c: any) => c.toLowerCase()),
        collectionIds: filter.collectionIds,
        blockNumber: filter.blockNumber,
        isActive: true,
      });
      dispatch(
        getNFTsSuccessAtFirstAction({
          ...data,
          pageBefore: pageNumber,
        }),
      );
      dispatch(asyncTaskStopAction(taskId));
      callback && callback();
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getMyNFTsAction = (
  params: GetMyNFTRequest,
  callback?: () => void,
) => {
  const taskId = NFTsActionTypeEnum.GET_MY_NFTS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await nftService.GetMyNFTs(params);
      dispatch(getMyNFTsSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
      callback && callback();
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const resetNFTPreviewAction = () => {
  const taskId = NFTsActionTypeEnum.GET_NFT_PREVIEW;
  return (dispatch: DispatchType): void => {
    dispatch(getNFTPreviewFailureAction());
    dispatch(ayncTaskResetAction(taskId));
  };
};

export const getNFTPreviewAction = ({ link }: { link: string }) => {
  const taskId = NFTsActionTypeEnum.GET_NFT_PREVIEW;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const params = convertLinkToNFTParams(link);
      if (!params) {
        dispatch(getNFTPreviewFailureAction());
        dispatch(
          asyncTaskStopAction(taskId, {
            data: {
              message: 'no support',
            },
          } as ApiError),
        );
        return;
      }
      const data = await nftService.GetNFTPreview(params);
      if (!SUPPORT_CONTENT_TYPE.includes('png')) {
        dispatch(getNFTPreviewFailureAction());
        dispatch(
          asyncTaskStopAction(taskId, {
            data: {
              message:
                'Unsupported NFT file type. Add GIF, PNG, JPEG, JPG, WebM, WebP, MP4, SVG',
            },
          } as ApiError),
        );
      } else {
        dispatch(
          getNFTPreviewSuccessAction({
            ...data,
            marketplace: params.marketplace,
          }),
        );
        const categories: CategoryWithinParsedLink[] | undefined =
          data.categories?.map((cat) => ({
            imgUrl: cat.imgUrl,
            name: cat.name,
            totalItem: cat.totalItem,
            position: cat.position,
          }));
        categories && dispatch(addCategoriesToEstimate(categories)); // add categories to nftEstimateReducer
        dispatch(asyncTaskStopAction(taskId));
      }
    } catch (error) {
      dispatch(getNFTPreviewFailureAction());
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getNFTDetailAction = (
  params: GetNFTDetailRequest,
  callback?: () => void,
) => {
  const taskId = NFTsActionTypeEnum.GET_NFT_DETAIL;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await nftService.GetNFTDetail(params);
      dispatch(getNFTDetailSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
      callback && callback();
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const deleteNFT = (
  id: string,
  callback: (success: boolean) => void,
  shouldShow?: boolean,
) => {
  const taskId = NFTsActionTypeEnum.DELETE_MY_NFTS;
  return async (dispatch: DispatchType, getState: () => any): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await nftService.DeleteMyNFT(id);
      if (!shouldShow) {
        callback(true);
        dispatch(asyncTaskStopAction(taskId));
        return;
      }
      const nfts = getState().nftsReducer;
      const index = nfts.data.findIndex((n: NFT) => `${n.id}` === id);
      nfts.data.splice(index, 1);
      const request = {
        pageNumber: nfts.pageNumber,
        pageSize: nfts.pageSize,
        total: nfts.total,
      };
      const loadMore = hasMore(request);
      if (!loadMore) {
        dispatch(
          deleteSuccessMyNFT({
            ...nfts,
            data: [...nfts.data],
            total: nfts.total - 1,
            totalInactive:
              nfts.totalInactive - (nfts.data[index].isActive ? 0 : 1),
          }),
        );
      } else {
        const result = await nftService.GetMyNFTs({
          ...request,
          filterBy: 'Recently Added',
        });
        dispatch(
          deleteSuccessMyNFT({
            ...nfts,
            data: [...nfts.data, result.data[result.data.length - 1]],
            total: nfts.total - 1,
            totalInactive:
              nfts.totalInactive - (nfts.data[index].isActive ? 0 : 1),
          }),
        );
      }
      dispatch(asyncTaskStopAction(taskId));
      callback(true);
    } catch (error) {
      callback(false);
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getNFTEstimateStartRequestAction = (
  payload: GetNftEstimateParams,
) => ({
  type: AddNftActionTypeEnum.GET_ESTIMATE,
  payload,
});

export const getNFTEstimateSuccessRequestAction = (
  payload: NFTEstimateResponse,
) => ({
  type: AddNftActionTypeEnum.GET_ESTIMATE_SUCCESS,
  payload,
});

export const getNFTEstimateFailRequestAction = () => ({
  type: AddNftActionTypeEnum.GET_ESTIMATE_FAIL,
});

export const resetNFTEstimateAciton = () => ({
  type: AddNftActionTypeEnum.RESET_ESTIMATE,
});

export const setDefaultPostionEstimateAction = () => ({
  type: AddNftActionTypeEnum.SET_DEFAULT_POSTION,
});

export const addCategoriesToEstimate = (
  payload: CategoryWithinParsedLink[],
) => ({
  type: AddNftActionTypeEnum.ADD_CATEGORIES,
  payload,
});

export const deleteCategoryInEstimateNFT = (name: string) => ({
  type: AddNftActionTypeEnum.DELETE_CATEGORY,
  payload: name,
});

export const getNFTEstimateAction = (params: GetNftEstimateParams) => {
  const taskId = AddNftActionTypeEnum.GET_ESTIMATE;
  return async (
    dispatch: DispatchType,
    getState: () => RootStateType,
  ): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      dispatch(getNFTEstimateStartRequestAction(params));
      const state = getState();
      const nftEstimate = state.nftEstimateReducer;
      const isValidateEstimateTime = validateEstimateTime(nftEstimate.params);
      // const lastEditInput = nftEstimate.params.lastEditInput;

      if (!isValidateEstimateTime) return;

      // const miniumPrice = await miniumPriceService.getMiniumPricePerDayDebounce(
      //   {
      //     key: 'miniumPricePerday',
      //   },
      // );

      const days = Number(nftEstimate.params.days) || 0;
      const months = Number(nftEstimate.params.months) || 0;
      const hours = Number(nftEstimate.params.hours) || 0;

      const value = Number(nftEstimate.params.nftValue) || 0;

      const duration =
        days * 24 * 3600 + months * 30 * 24 * 3600 + hours * 3600;

      const squarePrice = value / duration;

      const { postionOnCategories } = await nftService.getNFTEstimateDebounce({
        squarePrice: squarePrice,
      });

      dispatch(
        getNFTEstimateSuccessRequestAction({
          avgTime: 0,
          blockNumber: 1,
          positionWithinBlock: 1,
          squarePrice: squarePrice,
          postionOnCategories,
        }),
      );

      // const { position, squarePrice, nftValue, category } = nftEstimate.params;
      // const listCategory = nftEstimate.categories
      //   ?.map((cat) => cat.name)
      //   .join(',');

      // const isChangeTime =
      //   params.hasOwnProperty(InputEstimateParamsEnum.MONTHS) ||
      //   params.hasOwnProperty(InputEstimateParamsEnum.DAYS) ||
      //   params.hasOwnProperty(InputEstimateParamsEnum.HOURS);
      // const isChangePosition = params.hasOwnProperty(
      //   InputEstimateParamsEnum.POSITION,
      // );
      // const isChangeNftValue = params.hasOwnProperty(
      //   InputEstimateParamsEnum.NFT_VALUE,
      // );
      // let paramsService: any = {};

      // // Estimate with free policy (squarePrice is $0)
      // if (
      //   Number(miniumPrice.value) === 0 &&
      //   parseFloat(nftValue || '') === 0 &&
      //   lastEditInput !== InputEstimateParamsEnum.POSITION
      // ) {
      //   const payload = await nftService.getNFTEstimateDebounce({
      //     squarePrice: 0,
      //     categories: listCategory,
      //   });
      //   dispatch(getNFTEstimateSuccessRequestAction(payload));
      //   dispatch(asyncTaskStopAction(taskId));
      //   return;
      // }

      // // Estimate not free square price greater than $0.1
      // if (!isNil(position) && (isChangePosition || isChangeTime)) {
      //   paramsService = {
      //     position,
      //   };
      // }

      // if (!isNil(squarePrice) && (isChangeNftValue || isChangeTime)) {
      //   paramsService = {
      //     squarePrice,
      //   };
      // }

      // if (!isNil(position) && !isNil(squarePrice) && isChangeTime) {
      //   if (
      //     !lastEditInput ||
      //     lastEditInput === InputEstimateParamsEnum.POSITION
      //   ) {
      //     paramsService = {
      //       position,
      //     };
      //   } else {
      //     paramsService = { squarePrice };
      //   }
      // }

      // if (
      //   !Number(squarePrice) &&
      //   lastEditInput !== InputEstimateParamsEnum.POSITION
      // ) {
      //   dispatch(setDefaultPostionEstimateAction());
      //   return;
      // }

      // if (!isEmpty(paramsService) && paramsService?.position !== '') {
      //   paramsService = {
      //     ...paramsService,
      //     categories: listCategory,
      //     category,
      //   };
      //   const payload = await nftService.getNFTEstimateDebounce(paramsService);
      //   dispatch(getNFTEstimateSuccessRequestAction(payload));
      // }

      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      console.log('error: ', error);
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
      dispatch(getNFTEstimateFailRequestAction());
    }
  };
};

export const createNFT = (
  body: CreateNFT,
  callback: (success: boolean, totalClonedItem?: number) => void,
  shouldShow?: boolean,
) => {
  const taskId = NFTsActionTypeEnum.CREATE_NEW_NFT;
  return async (dispatch: DispatchType, getState: () => any): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await nftService.AddNewNFT(body);
      if (shouldShow) {
        const nfts = getState().nftsReducer;
        nfts.data.unshift(data);
        dispatch(
          addNFTSuccessAction({
            ...nfts,
            data: [...nfts.data],
            total: nfts.total + 1,
            totalInactive: nfts.totalInactive + 1,
          }),
        );
        const request = {
          pageNumber: nfts.pageNumber,
          pageSize: nfts.pageSize,
          total: nfts.total,
        };
        const loadMore = hasMore(request);
        if (loadMore) {
          nfts.data.pop();
          dispatch(
            addNFTSuccessAction({
              ...nfts,
              data: [...nfts.data],
            }),
          );
        }
      }
      dispatch(asyncTaskStopAction(taskId));
      callback(true, data.totalClonedItem);
    } catch (error: any) {
      if (error.response.data.key === 'CLONE_LIMIT_EXCEEDS') {
        callback(false);
      }
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getPriceNFTBaseOnDollarSucessAction = (
  payload: PriceNFTBaseOnDollar,
) => ({
  type: AddNftActionTypeEnum.GET_PRICE_NFT_SUCCESS,
  payload,
});

export const getPriceNFTBaseOnDollarAction = () => {
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      // const payload = await nftService.getNFTPriceBaseOnDollar();
      // let successPayload: PriceNFTBaseOnDollar = {};
      // payload.forEach((item) => {
      //   successPayload[item.symbol] = item.rate;
      // });
      // dispatch(getPriceNFTBaseOnDollarSucessAction(successPayload));
    } catch (error) {}
  };
};

export const AdminDeleteNFT = (id: string, callback: () => void) => {
  const taskId = NFTsActionTypeEnum.DELETE_BY_ADMIN;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await nftService.AdminDeleteNFT(id);
      dispatch(
        updateDialogStateAction({
          open: true,
          component: CommonSuccessDialog,
          props: {
            callback,
          },
        }),
      );
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
      dispatch(
        updateDialogStateAction({
          open: true,
          component: CommonFailedDialog,
        }),
      );
    }
  };
};

export const getNFTDetailForEditSuccessAction = (payload: NFT) => ({
  type: EditNFTActionTypeEnum.GET_NFT_DETAIL_SUCCESS,
  payload,
});

export const GetCurrentEstimateSuccessAction = (
  payload: NFTEstimateResponse,
) => ({
  type: EditNFTActionTypeEnum.GET_CURRENT_ESTIMATE_INFO_SUCCESS,
  payload,
});

export const getNFTDetailForEditAction = (params: GetNFTDetailRequest) => {
  const taskId = EditNFTActionTypeEnum.GET_NFT_DETAIL_SUCCESS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const nftDetailInfo = await nftService.GetNFTDetail(params);
      dispatch(getNFTDetailForEditSuccessAction(nftDetailInfo));
      const { position } = nftDetailInfo;

      // position get by API detail NFT is position in category named "NFT"
      const currentEstimateInfo = await nftService.GetNFTEstimate({
        position: Number(position),
        category: CategoriesName.NFT,
      });
      dispatch(
        GetCurrentEstimateSuccessAction({
          ...currentEstimateInfo,
          position: Number(position),
        }),
      );
      dispatch(
        getNFTEstimateForEditAction({
          category: CategoriesName.NFT,
          position,
          lastEditInput: InputEstimateParamsEnum.POSITION,
        }),
      );
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getPriceNFTForEditSucessAction = (
  payload: PriceNFTBaseOnDollar,
) => ({
  type: EditNFTActionTypeEnum.GET_PRICE_NFT_FOR_EDIT_SUCCESS,
  payload,
});

export const getPriceNFTForEditAction = () => {
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      // const payload = await nftService.getNFTPriceBaseOnDollar();
      // let successPayload: PriceNFTBaseOnDollar = {};
      // payload.forEach((item) => {
      //   successPayload[item.symbol] = item.rate;
      // });
      // dispatch(getPriceNFTForEditSucessAction(successPayload));
    } catch (error) {}
  };
};

// For edit nft

export const getNFTEstimateForEditStartRequestAction = (
  payload: GetNftEstimateParams,
) => ({
  type: EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT,
  payload,
});

export const getNFTEstimateForEditSuccessRequestAction = (
  payload: NFTEstimateResponse,
) => ({
  type: EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT_SUCCESS,
  payload,
});

export const getNFTEstimateForEditFailRequestAction = () => ({
  type: EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT_FAIL,
});

export const getNFTEstimateForEditAction = (params: GetNftEstimateParams) => {
  const taskId = EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT;
  return async (
    dispatch: DispatchType,
    getState: () => RootStateType,
  ): Promise<void> => {
    try {
      dispatch(getNFTEstimateForEditStartRequestAction(params));
      const state = getState();
      const nftEstimateForEdit = state.editNFTReducer;
      const lastEditInput = nftEstimateForEdit.params.lastEditInput;
      const isValidateEstimateTime = validateEstimateTime(
        nftEstimateForEdit.params,
      );
      if (!isValidateEstimateTime) return;

      const { position, squarePrice, category } = nftEstimateForEdit.params;
      const listCategory = nftEstimateForEdit.categories
        // ?.filter((cat) => cat.name !== CategoriesName.NFT)
        ?.map((cat) => cat.name)
        .join(',');

      const isChangeTime =
        params.hasOwnProperty(InputEstimateParamsEnum.MONTHS) ||
        params.hasOwnProperty(InputEstimateParamsEnum.DAYS) ||
        params.hasOwnProperty(InputEstimateParamsEnum.HOURS);
      const isChangePosition = params.hasOwnProperty(
        InputEstimateParamsEnum.POSITION,
      );
      const isChangeNftValueOrNftUnit =
        params.hasOwnProperty(InputEstimateParamsEnum.NFT_VALUE) ||
        params.hasOwnProperty(InputEstimateParamsEnum.NFT_UNIT);
      let paramsService = {};

      if (!isNil(position) && (isChangePosition || isChangeTime)) {
        paramsService = { position };
      }

      if (!isNil(squarePrice) && isChangeNftValueOrNftUnit) {
        paramsService = { squarePrice };
      }

      if (!isNil(position) && !isNil(squarePrice) && isChangeTime) {
        if (lastEditInput === InputEstimateParamsEnum.POSITION) {
          paramsService = { position };
        } else {
          paramsService = { squarePrice };
        }
      }

      if (!isEmpty(paramsService)) {
        paramsService = {
          ...paramsService,
          categories: listCategory,
          category,
        };
        dispatch(asyncTaskStartAction(taskId));
        const payload = await nftService.getNFTEstimateDebounce(paramsService);
        dispatch(getNFTEstimateForEditSuccessRequestAction(payload));
        dispatch(asyncTaskStopAction(taskId));
      }
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
      dispatch(getNFTEstimateForEditFailRequestAction());
    }
  };
};

export const resetEstimateForEditAction = () => ({
  type: EditNFTActionTypeEnum.RESET_ESTIMATE_FOR_EDIT,
});

export const deleteCategoryInEditNFTAction = (categoryName: string) => ({
  type: EditNFTActionTypeEnum.DELETE_CATEGORY,
  payload: categoryName,
});
