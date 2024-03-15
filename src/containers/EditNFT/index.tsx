import React, { useMemo, useEffect, useCallback, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import Back from 'components/Back';
import ParseNFTInput from 'components/ParseNFTInput';
import PreviewNFT from 'components/PreviewNFT';
import { useHistory, useParams } from 'react-router';
import { useStyle } from './style';
import { useSelector, useDispatch } from 'react-redux';
import {
  sTaskStatus,
  getEditNFT,
  getUserState,
  getNFTDetailForEdit,
  getNFTPriceForEdit,
  getNFTParamsForEdit,
  getNFTEstimateInfoForEdit,
} from 'store/selectors';
import {
  getPriceNFTForEditAction,
  getNFTDetailForEditAction,
  getNFTEstimateForEditAction,
  deleteCategoryInEditNFTAction,
} from 'store/actions/nftActions';
import { INTERVAL_VALUE } from 'common/constant';
import CurrentDateAndValueComponent, {
  CurrentInfo,
} from 'components/common/CurrentDateAndVlueComponent';
import DateSelectComponent from 'components/common/DateSelectComponent';
import InputNFTValue from 'components/AddNFT/InputNFTValue';
import AccountBalanceWallet from 'icons/AccountBalanceWallet';
import EstimateInfo from 'components/AddNFT/EstimateInfo';
import { numberWithCommas } from 'utils/formatNumber';
import clsx from 'clsx';
import { isNil } from 'lodash';
import { DEAD_ZONE_BLOCK_NUMBER } from 'common/constant';
import {
  convertNumberToOrdinal,
  getEnableConnectWallet,
} from 'utils/validateAddNFT';
import { GetNftEstimateParams } from 'types/addNft';
import { EditNFTActionTypeEnum } from 'enums/actions';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import ConnectWalletDialog from 'components/ConnectWallet';
import { resetEstimateForEditAction } from 'store/actions/nftActions';
import WarningEditPopup from 'components/Popup/WarningEditPopup';
import { InputEstimateParamsEnum } from 'enums/addNft';

import TextFieldMessageDialog from 'components/Dialog/TextFieldMessageDialog';
import TextLoadingMessageDialog from 'components/Dialog/TextLoadingMessageDialog';
import TextMessageDialog from 'components/Dialog/TextMessageDialog';
import TransactionFailedDialog from 'components/Dialog/TransactionFailedDialog';
import nftService from 'services/nfts';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { abi, walletAddress } from 'services/contract';
import { MiniumPricePerDayResponse } from 'types/miniumPricePerDay';
import miniumPriceService from 'services/miniumPrice';
import Position from 'containers/AddNFT/Position';
import {
  getWalletAddress,
  getProvider,
  getNFTValueBaseOnEth,
  convertTimeLeftToSecond,
  switchNetwork,
} from 'utils/wallet';
import useTitle from 'hooks/useTitle';

export default function EditNFT() {
  const { nftId } = useParams<{ nftId: string }>();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(getUserState);
  const editNFT = useSelector(getEditNFT);
  const nftDetail = useSelector(getNFTDetailForEdit);
  const nftPrice = useSelector(getNFTPriceForEdit);
  const params = useSelector(getNFTParamsForEdit);
  const estimateInfo = useSelector(getNFTEstimateInfoForEdit);

  const nftEdit = useSelector(getNFTDetailForEdit);
  const nftEditEstimate = useSelector(getEditNFT);

  const { account, active, library, chainId } = useWeb3React();
  const [isCorrectNetwork, setCorrectNetwork] = useState<boolean>(false);

  const estimateStatus = useSelector(
    sTaskStatus(EditNFTActionTypeEnum.GET_ESTIMATE_FOR_EDIT),
  );

  const [minPrice, setMinPrice] = useState<
    MiniumPricePerDayResponse | undefined
  >();

  const fetchData = async () => {
    try {
      const data = await miniumPriceService.GetMiniumPricePerDay({
        key: 'miniumPricePerday',
      });
      setMinPrice(data);
    } catch (error) {
      setMinPrice(undefined);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  const isLowerMinimumPrice = useMemo(() => {
    const { squarePrice } = params;
    if (isNil(squarePrice)) return false;
    if (squarePrice >= Number(minPrice?.value || 0.1)) return false;
    return true;
  }, [params, minPrice]);

  const enableConnectWallet = useMemo(() => {
    return isLowerMinimumPrice
      ? false
      : getEnableConnectWallet(editNFT, true) && !estimateStatus?.processing;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editNFT, estimateStatus?.processing]);

  const categories = useMemo(() => {
    if (editNFT.categories.length === 0) return;
    const cloneCategories = [...editNFT.categories];
    const indexNFT = cloneCategories.findIndex((item) => item.name === 'NFT');
    const nftCategory = cloneCategories.splice(indexNFT, 1)[0];
    return [nftCategory, ...cloneCategories];
  }, [editNFT.categories]);

  const classes = useStyle({
    paymentStatus: enableConnectWallet,
    priceStatus: isLowerMinimumPrice,
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.up('md')) && !isDesktop;

  // passed categoy here
  const previewNft = useMemo(() => {
    if (nftDetail) return <PreviewNFT data={nftDetail} estimates />;
    return null;
  }, [nftDetail]);

  const currentInfo: CurrentInfo = useMemo(() => {
    if (nftDetail) {
      const { nftUnit, squarePrice, months, days, hours, totalValueByUSD } =
        nftDetail;
      const ethPrice = nftPrice[nftUnit];
      let value: number | undefined = undefined;
      if (!isNil(ethPrice)) {
        value = Number(totalValueByUSD / ethPrice);
      }

      return {
        months: months?.toString(),
        days: days?.toString(),
        hours: hours?.toString(),
        pricePerDay: Number(squarePrice?.toFixed(2)),
        unit: nftUnit,
        value: value,
      };
    }
    return {
      months: '',
      days: '',
      hours: '',
      pricePerDay: undefined,
      unit: undefined,
      value: undefined,
    };
  }, [nftDetail, nftPrice]);

  const getPriceNFT = useCallback(() => {
    dispatch(getPriceNFTForEditAction());
  }, [dispatch]);

  const estimateInfoProps = useMemo(() => {
    const { percentile, blockNumber, positionWithinBlock, avgTime } =
      estimateInfo;

    let percentileValue: string;
    let percentileDisplayValue: string;
    if (isNil(percentile)) {
      percentileValue = '--';
      percentileDisplayValue = '--';
    } else {
      percentileValue = `${percentile.toFixed(2)}%`;
      percentileDisplayValue = `${percentile.toFixed()}%`;
    }

    let isDeadZone = false;
    let blockNumberValue: string;
    if (isNil(blockNumber)) {
      blockNumberValue = '--';
    } else {
      if (blockNumber === DEAD_ZONE_BLOCK_NUMBER) {
        isDeadZone = true;
        blockNumberValue = 'DeadZone';
      } else {
        blockNumberValue = `${blockNumber}`;
      }
    }

    const positionWithinBlockValue = positionWithinBlock
      ? `${convertNumberToOrdinal(positionWithinBlock)}`
      : '--';

    let avgTimeDisplayValue: string;
    let avgTimeValue: string;
    if (isNil(avgTime)) {
      avgTimeValue = '--';
      avgTimeDisplayValue = '--';
    } else {
      avgTimeValue = `${avgTime.toFixed(2)}%`;
      if (avgTime > 999) {
        avgTimeDisplayValue = `>999%`;
      } else if (avgTime < 1) {
        avgTimeDisplayValue = '<1%';
      } else {
        avgTimeDisplayValue = `${avgTime.toFixed()}%`;
      }
    }

    return [
      {
        label: 'Percentile',
        value: percentileValue,
        tooltip: 'Item can be found on the top x% of the 1001',
        displayValue: percentileDisplayValue,
      },
      {
        label: 'Block number',
        value: blockNumberValue,
        isDeadZone,
        tooltip: 'Item can be found in block number x/12',
      },
      {
        label: 'Block position',
        value: positionWithinBlockValue,
        tooltip: 'Item can be found in this position inside its block',
      },
      {
        label: 'Time vs Average',
        value: avgTimeValue,
        tooltip: "Item's initial time is x% of average active time",
        displayValue: avgTimeDisplayValue,
      },
    ];
  }, [estimateInfo]);

  const handleChangeTime = useCallback(
    (params: GetNftEstimateParams) => {
      dispatch(getNFTEstimateForEditAction(params));
    },
    [dispatch],
  );

  const handleChangeNftValue = useCallback(
    (params: GetNftEstimateParams) => {
      dispatch(
        getNFTEstimateForEditAction({
          ...params,
          lastEditInput: InputEstimateParamsEnum.NFT_VALUE,
        }),
      );
    },
    [dispatch],
  );

  const openConnectWallet = useCallback(() => {
    if (Number(params.nftValue) < 0)
      dispatch(
        updateDialogStateAction({
          open: true,
          component: WarningEditPopup,
          props: {
            text: 'The added value input you have chosen is a negative number.\n NFT AdvertiseX does not support any refunds on transactions.\n Please update your input settings and try again.',
            buttonText: 'OK',
          },
        }),
      );
    else
      dispatch(
        updateDialogStateAction({
          open: true,
          component: ConnectWalletDialog,
          props: {
            payment: true,
          },
        }),
      );
  }, [dispatch, params.nftValue]);

  const onConfirmPayment = async () => {
    if (Number(params.nftValue) < 0) {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: WarningEditPopup,
          props: {
            text: 'The added value input you have chosen is a negative number.\n NFT AdvertiseX does not support any refunds on transactions.\n Please update your input settings and try again.',
            buttonText: 'OK',
          },
        }),
      );
      return;
    }
    try {
      if (!isCorrectNetwork) {
        if (Number(params.nftValue)) {
          await switchNetwork(nftEditEstimate, library);
          return;
        }
      }
      const nftPreview = nftEdit;
      if (!nftPreview) return;
      dispatch(
        updateDialogStateAction({
          open: true,
          component: TextLoadingMessageDialog,
        }),
      );
      let data: any = {};
      if (!nftPreview.id) {
        data = await nftService.AddNewNFT({
          tokenId: nftPreview.tokenId,
          tokenAddress: nftPreview.tokenAddress,
          chain: nftPreview.chain,
          marketplace: nftPreview.marketplace,
          time: convertTimeLeftToSecond(nftEditEstimate),
          categoriesOnNft: [], // temporary fix
        });
      } else {
        const categoriesOnNft = editNFT.categories.map((cat) => cat.name);
        await nftService.UpdateNFT(`${nftPreview.id}`, {
          time: convertTimeLeftToSecond(nftEditEstimate),
          categoriesOnNft,
        });
      }
      const web3 = new Web3(getProvider(library));
      const lottery = new web3.eth.Contract(
        abi as any,
        getWalletAddress(chainId),
      );
      if (Number(params.nftValue)) {
        await lottery.methods
          .createPayment(`${data.id || nftPreview.id}`)
          .send({
            from: account,
            value: web3.utils.toBN(
              web3.utils.toWei(
                getNFTValueBaseOnEth(nftEditEstimate) + '',
                'ether',
              ),
            ),
          });
      }
      dispatch(
        updateDialogStateAction({
          open: true,
          component: TextFieldMessageDialog,
          props: {
            imageUrl: nftPreview.imageUrl,
            metadata: nftPreview.metadata,
            isAdded: false,
          },
        }),
      );
    } catch (e: any) {
      console.log(e);
      if (e.response && e.response.data.key === 'CLONE_LIMIT_EXCEEDS') {
        dispatch(
          updateDialogStateAction({
            open: true,
            component: TextMessageDialog,
          }),
        );
      } else {
        dispatch(
          updateDialogStateAction({
            open: true,
            component: TransactionFailedDialog,
          }),
        );
      }
    }
  };

  useEffect(() => {
    const nftEstimate = nftEditEstimate;
    const wallet = walletAddress.find(
      // eslint-disable-next-line eqeqeq
      (i) => i.chainName == nftEstimate.params.nftUnit,
    );
    // eslint-disable-next-line eqeqeq
    if (wallet?.id != chainId) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  }, [nftEditEstimate, chainId]);

  useEffect(() => {
    getPriceNFT();
    const timerId = setInterval(getPriceNFT, INTERVAL_VALUE);
    return () => {
      clearInterval(timerId);
    };
  }, [getPriceNFT]);

  useEffect(() => {
    dispatch(getNFTDetailForEditAction({ nftId }));
  }, [nftId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetEstimateForEditAction());
    };
  }, [dispatch]);

  useTitle('Edit NFT | NFT AdvertiseX');

  const handleDelete = useCallback(
    (name: string) => {
      dispatch(deleteCategoryInEditNFTAction(name));
    },
    [dispatch],
  );

  const handleChangePosition = useCallback(
    (category: string, position?: string) => {
      dispatch(
        getNFTEstimateForEditAction({
          category,
          position,
          lastEditInput: InputEstimateParamsEnum.POSITION,
        }),
      );
    },
    [dispatch],
  );

  const Estimate = useMemo(() => {
    if (isDesktop) {
      return (
        <div className={classes.estimateDeskop}>
          <EstimateInfo informations={estimateInfoProps} />
        </div>
      );
    }
    return null;
  }, [isDesktop, estimateInfoProps, classes]);

  const renderPostion = useMemo(() => {
    if (!categories || categories.length === 0) return null;
    return (
      <Position
        categories={categories}
        onChange={handleChangePosition}
        label="Position"
        onDelete={handleDelete}
      />
    );
  }, [categories, handleChangePosition, handleDelete]);

  return (
    <>
      <Box className={classes.container_1}>
        <Back onClick={history.goBack} />
        <Grid container xs={12} className={classes.container}>
          <Grid xs={12} lg={5} item className={classes.left}>
            <Box>
              <Typography className={classes.linkTitle}>
                Paste your NFT listing URL
              </Typography>
              <ParseNFTInput
                value={nftDetail?.originalUrl || ''}
                noChange
                error={false}
                className={classes.parseInput}
                disabled
                borderNone
              />
              {previewNft}
            </Box>
            {Estimate}
            {isTablet && (
              <Typography className={classes.contentFirst}>
                Edit your current settings.
              </Typography>
            )}
          </Grid>
          <Grid xs={12} lg={7} item className={classes.right} container>
            {isDesktop && (
              <Grid item className={classes.wrapper}>
                <Typography className={classes.contentFirst}>
                  Edit your current settings.
                </Typography>
              </Grid>
            )}
            <Grid item className={classes.wrapper}>
              {isDesktop && (
                <Typography className={classes.contentSecond}>
                  Display NFTs for free for up to 30 days.
                  <br />
                  Place NFTs first based on square price per day.
                  <br />
                  Items after 1001 can’t be filtered.
                </Typography>
              )}
            </Grid>
            <Grid item className={classes.wrapper}>
              <Typography className={clsx(classes.title, classes.currentTitle)}>
                Remaining
              </Typography>
              <CurrentDateAndValueComponent
                currentInfo={currentInfo}
                minPrice={minPrice?.value}
              />
            </Grid>
            <Grid item>
              {!isDesktop && (
                <Typography
                  className={clsx(classes.title, classes.settingsTitle)}
                >
                  Settings
                </Typography>
              )}
              <Box className={classes.dateSelect}>
                <DateSelectComponent
                  months={params.months}
                  days={params.days}
                  hours={params.hours}
                  onChange={handleChangeTime}
                  className={classes.dateBox}
                  isEdit
                />
              </Box>
            </Grid>
            <Grid item className={classes.wrapper}>
              {isDesktop && (
                <Typography
                  className={clsx(classes.title, classes.settingsTitle)}
                >
                  Settings
                </Typography>
              )}
              <Box className={classes.priceDiv}>
                <InputNFTValue
                  label="Added Value"
                  value={params.nftValue}
                  unit={nftDetail?.transactions[0].coin.symbol}
                  onChange={handleChangeNftValue}
                  className={classes.valueBox}
                  disableChangeUnit
                />
                <Box>
                  <Typography className={classes.label}>
                    Price per day
                  </Typography>
                  <Box className={classes.priceBox}>
                    <Tooltip
                      title={
                        !isNil(params.squarePrice)
                          ? numberWithCommas(
                              Number(params.squarePrice).toFixed(2),
                            )
                          : '--'
                      }
                    >
                      <Typography className={classes.price}>
                        {!isNil(params.squarePrice)
                          ? `$${numberWithCommas(
                              Number(params.squarePrice).toFixed(2),
                            )}`
                          : '--'}
                      </Typography>
                    </Tooltip>
                    <Typography className={classes.miniumPrice}>
                      Minimum day price ${Number(minPrice?.value)?.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              className={clsx(classes.wrapper, classes.estimateWrapper)}
              item
            >
              {isDesktop && (
                <Typography
                  className={clsx(classes.title, classes.estimateTitle)}
                >
                  Position
                </Typography>
              )}
              <Grid container className={classes.positionBlock}>
                {!isDesktop && (
                  <div className={classes.estimateTablet}>
                    <Typography className={classes.title}>Estimates</Typography>
                    <EstimateInfo informations={estimateInfoProps} />
                  </div>
                )}
                {renderPostion}
                <Typography className={classes.service}>
                  By CONFIRMING PAYMENT I agree to NFT AdvertiseX{' '}
                  <a href="/terms-of-service" target="_blank">
                    <span className={classes.serviceLink}>
                      Terms of Service.
                    </span>
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid className={classes.confirm} item>
              <Button onClick={handleCancel}>
                <Typography>CANCEL</Typography>
              </Button>
              <Button
                onClick={user ? onConfirmPayment : openConnectWallet}
                disabled={!enableConnectWallet}
              >
                <AccountBalanceWallet
                  color={
                    enableConnectWallet ? '#FFFFFF' : 'rgba(0, 0, 0, 0.16)'
                  }
                />
                <Typography>
                  {user && active ? 'CONFIRM PAYMENT' : 'CONNECT WALLET'}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
