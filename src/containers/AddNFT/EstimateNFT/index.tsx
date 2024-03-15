import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  ClickAwayListener,
} from '@material-ui/core';
import DateSelectComponent from 'components/common/DateSelectComponent';
import AccountBalanceWallet from 'icons/AccountBalanceWallet';
import InputNFTValue from 'components/AddNFT/InputNFTValue';
import EstimateInfo from 'components/AddNFT/EstimateInfo';
import { getNFTEstimate } from 'store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetNftEstimateParams } from 'types/addNft';
import {
  deleteNFT,
  getNFTEstimateAction,
  resetNFTEstimateAciton,
  deleteCategoryInEstimateNFT,
} from 'store/actions/nftActions';
import { isNil } from 'lodash';
import {
  caculateTotalDays,
  convertNumberToOrdinal,
  getEnableConnectWallet,
  isStringNumber,
} from 'utils/validateAddNFT';
import { sTaskStatus, getUserState, getNFTPreview } from 'store/selectors';
import { AddNftActionTypeEnum } from 'enums/actions';
import { DEAD_ZONE_BLOCK_NUMBER } from 'common/constant';
import { numberWithCommas } from 'utils/formatNumber';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import ConnectWalletDialog from 'components/ConnectWallet';
import { useStyle } from './style';
import TextFieldMessageDialog from 'components/Dialog/TextFieldMessageDialog';
import TextLoadingMessageDialog from 'components/Dialog/TextLoadingMessageDialog';
import TextMessageDialog from 'components/Dialog/TextMessageDialog';
import TransactionFailedDialog from 'components/Dialog/TransactionFailedDialog';
import nftService from 'services/nfts';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { abi, walletAddress } from 'services/contract';
import { InputEstimateParamsEnum } from 'enums/addNft';
import {
  getWalletAddress,
  getProvider,
  getNFTValueBaseOnEth,
  convertTimeLeftToSecond,
  switchNetwork,
} from 'utils/wallet';
import Position from '../Position';

import miniumPriceService from 'services/miniumPrice';
import { MiniumPricePerDayResponse } from 'types/miniumPricePerDay';
import WarningAddNftDialog from 'components/Dialog/WarningAddNftDialog';
import WarningDialog from 'components/Dialog/WarningDialog';
import { MAX_NOT_DEAD_ZONE_POSITION, MIN_PRICE_PER_DAY } from 'common/constant';

interface EstimateProps {
  children: ReactElement;
  setEstimate: () => void;
  className?: string;
}

function Estimate(props: EstimateProps) {
  const { user } = useSelector(getUserState);
  const { children, setEstimate } = props;
  const theme = useTheme();
  const dispatch = useDispatch();

  const [tooltipMb, setTooltipMb] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<
    MiniumPricePerDayResponse | undefined
  >();

  const { account, active, library, chainId } = useWeb3React();
  const [isCorrectNetwork, setCorrectNetwork] = useState<boolean>(false);
  const [isLowPricePerDay, setIsLowPricePerDay] = useState<boolean>(false);

  const estimateStatus = useSelector(
    sTaskStatus(AddNftActionTypeEnum.GET_ESTIMATE),
  );
  const nftEstimate = useSelector(getNFTEstimate);
  const nftAddEstimate = useSelector(getNFTEstimate);
  const nftAdd = useSelector(getNFTPreview);

  const isLowerTotalDays = useMemo(() => {
    const { months, days, hours } = nftEstimate.params;
    return caculateTotalDays(Number(months), Number(days), Number(hours)) <
      0.2 / 24
      ? true
      : false;
  }, [nftEstimate]);

  const isLowerMinimumPrice = useMemo(() => {
    const { squarePrice } = nftEstimate.params;
    if (isNil(squarePrice)) {
      return false;
    } else if (squarePrice >= Number(minPrice?.value || 0.01)) {
      return false;
    } else {
      return true;
    }
  }, [nftEstimate, minPrice]);

  const enableConnectWallet = useMemo(() => {
    // Adding nft by FREE
    if (Number(minPrice?.value) === 0 && !isLowerTotalDays) return true;
    if (isLowerMinimumPrice) {
      return false;
    } else if (isLowPricePerDay) {
      return false;
    } else if (isLowerTotalDays) {
      return false;
    } else {
      return getEnableConnectWallet(nftEstimate) && !estimateStatus?.processing;
    }
  }, [
    nftEstimate,
    estimateStatus?.processing,
    isLowerMinimumPrice,
    minPrice?.value,
    isLowerTotalDays,
    isLowPricePerDay,
  ]);

  const classes = useStyle({
    paymentStatus: enableConnectWallet,
    priceStatus: isLowPricePerDay,
  });

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.up('md')) && !isDesktop;

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

  const handleChangeTime = useCallback(
    (params: GetNftEstimateParams) => {
      dispatch(
        getNFTEstimateAction({
          ...params,
          changeUnit: false,
        }),
      );
      setIsLowPricePerDay(false);
    },
    [dispatch],
  );

  const handleChangePosition = useCallback(
    (category: string, position?: string) => {
      dispatch(
        getNFTEstimateAction({
          category,
          position,
          lastEditInput: InputEstimateParamsEnum.POSITION,
          changeUnit: false,
        }),
      );
      setIsLowPricePerDay(false);
    },
    [dispatch],
  );

  const handleDelete = useCallback(
    (name: string) => {
      dispatch(deleteCategoryInEstimateNFT(name));
    },
    [dispatch],
  );

  const handleChangeNftValue = useCallback(
    (params: GetNftEstimateParams) => {
      dispatch(getNFTEstimateAction(params));
      setIsLowPricePerDay(false);
    },
    [dispatch],
  );

  const openConnectWallet = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: ConnectWalletDialog,
        props: {
          payment: true,
          isAdded: true,
        },
      }),
    );
  }, [dispatch]);

  const processPayment = async (id: string, isCloneFromUser?: boolean) => {
    try {
      const web3 = new Web3(getProvider(library));
      const lottery = new web3.eth.Contract(
        abi as any,
        getWalletAddress(chainId),
      );
      const gasPrice = await web3.eth.getGasPrice();
      const gasPriceIncrease = Math.round(Number(gasPrice) * 1.2);

      const value = web3.utils.toBN(
        web3.utils.toWei(getNFTValueBaseOnEth(nftAddEstimate) + '', 'ether'),
      );

      console.log('value: ', value);

      const contract = await lottery.methods.createPayment(`${id}`);
      let etGas = await contract.estimateGas({ from: account });
      etGas = Math.round(etGas * 1.2);
      await contract.send({
        from: account,
        value,
        gas: web3.utils.toHex(etGas),
        gasPrice: web3.utils.toHex(gasPriceIncrease),
      });

      await nftService.UpdateNFT(`${id}`, {
        isProcessPayment: false,
      });
    } catch (error) {
      dispatch(deleteNFT(`${id}`, () => {}));
      throw error;
    }
  };

  const handleCloseNotification = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: false,
      }),
    );
  }, [dispatch]);

  const onConfirmPayment = async () => {
    const { months, days, hours, nftValue, squarePrice } = nftEstimate.params;
    const categories = nftEstimate.categories;
    const isInDeadZonePosition = categories.some(
      (cat) => (cat?.position || 0) > MAX_NOT_DEAD_ZONE_POSITION,
    );

    const createNFT = async () => {
      try {
        if (!isCorrectNetwork) {
          await switchNetwork(nftAddEstimate, library);
          return;
        }

        const nftPreview = nftAdd;
        if (!nftPreview) return;

        dispatch(
          updateDialogStateAction({
            open: true,
            component: TextLoadingMessageDialog,
          }),
        );
        let data: any = {};
        if (!nftPreview.id) {
          // add new NFT
          const categoriesOnNft = nftAddEstimate.categories.map(
            (cat) => cat.name,
          );
          data = await nftService.AddNewNFT({
            tokenId: nftPreview.tokenId,
            tokenAddress: nftPreview.tokenAddress,
            chain: nftPreview.chain,
            marketplace: nftPreview.marketplace,
            isProcessPayment: true,
            time: convertTimeLeftToSecond(nftAddEstimate),
            categoriesOnNft,
          });
        } else {
          await nftService.UpdateNFT(`${nftPreview.id}`, {
            isProcessPayment: true,
            time: convertTimeLeftToSecond(nftAddEstimate),
          });
        }
        await processPayment(
          data.id || nftPreview.id,
          data.isCloneFromUser || nftPreview.isCloneFromUser,
        );
        dispatch(
          updateDialogStateAction({
            open: true,
            component: TextFieldMessageDialog,
            props: {
              imageUrl: nftPreview.imageUrl,
              metadata: nftPreview.metadata,
              isAdded: true,
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

    const handleAcceptNotification = () => {
      dispatch(
        updateDialogStateAction({
          open: false,
        }),
      );
      return createNFT();
    };

    // show notification when square price per day is greater than $0 and less than $0.1
    if (
      !isNil(squarePrice) &&
      0 < squarePrice &&
      squarePrice < MIN_PRICE_PER_DAY
    ) {
      if (!estimateStatus?.processing) {
        dispatch(
          updateDialogStateAction({
            open: true,
            component: WarningDialog,
            props: {
              headerTitle: 'Warning: Square price per day too low',
              contentTitle:
                'Choose a square price per day of $0.00 or $0.10 and above.',
              textCloseButton: 'BACK',
              textAcceptButton: 'ACCEPT',
              onClose: handleCloseNotification,
              onAccept: handleAcceptWarningLowPricePerDay,
            },
          }),
        );
      }
      return;
    }

    // start process create NFT
    if (
      Number(minPrice?.value) === 0 &&
      Number(nftValue) === 0 &&
      caculateTotalDays(Number(months), Number(days), Number(hours)) > 30
    ) {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: WarningAddNftDialog,
        }),
      );
      return;
    } else if (isInDeadZonePosition) {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: WarningDialog,
          props: {
            headerTitle: 'Warning: Cannot filter NFT in one or more categories',
            contentTitle:
              'Your NFT will not be filtered in each category while after 1001.',
            textCloseButton: 'BACK',
            textAcceptButton: 'ACCEPT & CONTINUE',
            onClose: handleCloseNotification,
            onAccept: handleAcceptNotification,
          },
        }),
      );
      return;
    } else {
      return createNFT();
    }
  };

  useEffect(() => {
    const nftEstimate = nftAddEstimate;
    const wallet = walletAddress.find(
      (i) => i.chainName === nftEstimate.params.nftUnit,
    );
    if (wallet?.id !== chainId) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  }, [nftAddEstimate, chainId]);

  const pricePerDay = useMemo(() => {
    if (!isNil(nftEstimate.params.squarePrice)) {
      return `$${numberWithCommas(nftEstimate.params.squarePrice.toFixed(2))}`;
    }
    return '--';
  }, [nftEstimate]);

  const estimateInfo = useMemo(() => {
    const { percentile, blockNumber, positionWithinBlock, avgTime } =
      nftEstimate.estimateInfo;

    let percentileValue: string;
    let percentileDisplayValue: string;
    if (isNil(percentile)) {
      percentileValue = '--';
      percentileDisplayValue = '--';
    } else {
      percentileValue = `${percentile.toFixed(2)}%`;
      if (percentile < 1) percentileDisplayValue = '<1%';
      else if (percentile > 999) percentileDisplayValue = '>999%';
      else percentileDisplayValue = `${percentile.toFixed()}%`;
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
      if (avgTime > 999) avgTimeDisplayValue = '>999%';
      else if (avgTime < 1) avgTimeDisplayValue = '<1%';
      else avgTimeDisplayValue = `${avgTime.toFixed()}%`;
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
  }, [nftEstimate]);

  useEffect(() => {
    return () => {
      dispatch(resetNFTEstimateAciton());
    };
  }, [dispatch]);
  useEffect(() => {
    const { squarePrice } = nftEstimate.params;
    if (
      !isNil(squarePrice) &&
      0 < squarePrice &&
      squarePrice < MIN_PRICE_PER_DAY
    )
      setIsLowPricePerDay(true);
  }, [nftEstimate.params]);

  const handleAcceptWarningLowPricePerDay = useCallback(() => {
    // close notification and change nft value to ensure square price day is $0.1
    const { months, days, hours, nftUnit } = nftEstimate.params;
    const rate = nftEstimate.priceNFT[nftUnit];
    if (
      isStringNumber(months) &&
      isStringNumber(days) &&
      isStringNumber(hours) &&
      !isNil(rate)
    ) {
      const totalDays = caculateTotalDays(
        Number(months!),
        Number(days!),
        Number(hours!),
      );
      const expectedSquarePricePerDay = 0.1;
      const nftValue = Number(
        ((expectedSquarePricePerDay * totalDays) / rate + 0.000001).toFixed(6),
      );
      dispatch(
        getNFTEstimateAction({
          nftValue: nftValue.toString(),
          lastEditInput: InputEstimateParamsEnum.NFT_VALUE,
          changeUnit: false,
        }),
      );
      setIsLowPricePerDay(false);
    }

    handleCloseNotification();
  }, [
    nftEstimate.params,
    nftEstimate.priceNFT,
    dispatch,
    handleCloseNotification,
  ]);

  const Estimate = useMemo(() => {
    if (isDesktop) {
      return (
        <div className={classes.estimateDeskop}>
          <EstimateInfo informations={estimateInfo} />
        </div>
      );
    }
    return null;
  }, [isDesktop, estimateInfo, classes]);

  const renderPostion = useMemo(() => {
    if (!nftAddEstimate.categories || nftAddEstimate.categories.length === 0)
      return null;
    return (
      <Position
        categories={nftAddEstimate.categories}
        onChange={handleChangePosition}
        onDelete={handleDelete}
      />
    );
  }, [nftAddEstimate.categories, handleChangePosition, handleDelete]);

  return (
    <>
      <Grid container xs={12} className={classes.container}>
        <Grid xs={12} lg={5} item className={classes.left}>
          {children}
          {Estimate}
          {isTablet && (
            <>
              <Typography className={classes.contentFirst}>
                Choose the time and starting position for your square.
              </Typography>
              <Typography
                className={clsx(classes.titleTablet, classes.tipTitle)}
              >
                Useful tips
              </Typography>
              <Typography className={classes.contentSecond}>
                Display NFTs for free for up to 30 days.
                <br />
                Place NFTs first based on square price per day.
                <br />
                Items after 1001 can’t be filtered.
              </Typography>
            </>
          )}
        </Grid>
        <Grid xs={12} lg={7} item className={classes.right} container>
          {isDesktop && (
            <Grid item className={classes.wrapper}>
              <Typography className={classes.contentFirst}>
                Choose the time and starting <br />
                position for your square.
              </Typography>
            </Grid>
          )}
          <Grid item className={classes.tipWrapper}>
            <Typography className={clsx(classes.title, classes.tipTitle)}>
              Useful tips
            </Typography>
            {!isDesktop && (
              <Typography className={classes.contentFirst}>
                Choose the time and starting position for your square.
              </Typography>
            )}
            <Typography className={classes.contentSecond}>
              Display NFTs for free for up to 30 days.
              <br />
              Place NFTs first based on square price per day.
              <br />
              Items after 1001 can’t be filtered.
            </Typography>
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
                months={nftEstimate.params.months}
                days={nftEstimate.params.days}
                hours={nftEstimate.params.hours}
                onChange={handleChangeTime}
                className={classes.dateBox}
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
                label="Amount"
                value={nftEstimate.params.nftValue}
                placeholder="0"
                unit={nftEstimate.params.nftUnit}
                onChange={handleChangeNftValue}
                className={classes.inputnftvalue}
              />
              <Box className={classes.wrapPricePerday}>
                <Typography className={classes.label}>Price per day</Typography>
                {isDesktop ? (
                  <Box className={classes.priceBox}>
                    <Tooltip
                      title={
                        nftEstimate.params.squarePrice
                          ? `$${nftEstimate.params.squarePrice?.toFixed(3)}`
                          : '--'
                      }
                    >
                      <Typography className={classes.price}>
                        {pricePerDay}
                      </Typography>
                    </Tooltip>
                    <Typography className={classes.miniumPrice}>
                      Minimum day price $
                      {Number(minPrice?.value)?.toFixed(2) || '0.10'}
                    </Typography>
                  </Box>
                ) : (
                  <ClickAwayListener onClickAway={() => setTooltipMb(false)}>
                    <Box
                      className={classes.priceBox}
                      onClick={() => setTooltipMb(!tooltipMb)}
                    >
                      <Tooltip
                        title={
                          nftEstimate.params.squarePrice
                            ? `$${nftEstimate.params.squarePrice?.toFixed(3)}`
                            : '--'
                        }
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        open={tooltipMb}
                      >
                        <Typography className={classes.price}>
                          {pricePerDay}
                        </Typography>
                      </Tooltip>
                      <Typography className={classes.miniumPrice}>
                        Minimum day price $
                        {Number(minPrice?.value)?.toFixed(2) || '0.10'}
                      </Typography>
                    </Box>
                  </ClickAwayListener>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid className={clsx(classes.wrapper, classes.estimateWrapper)} item>
            {isDesktop && (
              <Typography
                className={clsx(classes.title, classes.estimateTitle)}
              >
                Position
              </Typography>
            )}
            <Grid container className={classes.estimateBlock}>
              {!isDesktop && (
                <div className={classes.estimateTablet}>
                  <Typography className={classes.title}>Estimates</Typography>
                  <EstimateInfo informations={estimateInfo} />
                </div>
              )}
              {renderPostion}
              <Typography className={classes.service}>
                By CONFIRMING PAYMENT I agree to Mintedgem{' '}
                <a href="/terms-of-service" target="_blank">
                  <span className={classes.serviceLink}>Terms of Service.</span>
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.confirm} item>
            <Button onClick={setEstimate}>
              <Typography>CANCEL</Typography>
            </Button>
            <Button
              disabled={!enableConnectWallet}
              onClick={user ? onConfirmPayment : openConnectWallet}
            >
              <AccountBalanceWallet
                color={enableConnectWallet ? '#FFFFFF' : 'rgba(0, 0, 0, 0.16)'}
              />
              <Typography>
                {user && active ? 'CONFIRM PAYMENT' : 'CONNECT WALLET'}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Estimate;
