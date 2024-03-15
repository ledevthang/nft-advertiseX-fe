/* eslint-disable */
import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import PlaceholderLoader from 'components/common/PlacehoderLoader';
import { Orientations } from 'enums/orientations';

interface IData {
  orientation: Orientations;
  idBlock: number;
  includeDz?: boolean;
  blocksByTimePath?: string;
  processing?: boolean;
}

function TwelveBlocksPanelAdmin({
  orientation,
  includeDz,
  blocksByTimePath,
  idBlock,
  processing,
}: IData) {
  const classes = useStyle();

  const idBlockSelected = useMemo(() => {
    if (idBlock === 14)
      return orientation === Orientations.TWITTER_POST ? 14 : 13;
    return idBlock;
  }, [idBlock, orientation]);

  const imgResult = useMemo(() => {
    const imgUrl = `https://minted-gem-be-s3.s3.eu-west-1.amazonaws.com/${blocksByTimePath}/${idBlockSelected}.png`;

    if (orientation === Orientations.ORIGINAL) {
      if (idBlockSelected === 13)
        return (
          <>
            <div>
              <img src={imgUrl} alt="" />
            </div>
            {includeDz && <div className={classes.dzBlock}></div>}
          </>
        );
      return (
        <>
          <div style={{ marginLeft: 4 }}>
            <img src={imgUrl} width={90} height={90} alt="" />
          </div>
          {includeDz && <div className={classes.dzBlock}></div>}
        </>
      );
    }

    if (idBlockSelected === 14)
      return (
        <div>
          <img src={imgUrl} alt="" />
        </div>
      );

    return (
      <div>
        <img
          src={imgUrl}
          width={377}
          height={377}
          style={{ objectFit: 'cover' }}
        />
      </div>
    );
  }, [blocksByTimePath, idBlock, orientation, idBlockSelected, includeDz]);

  return (
    <div>
      <div style={{ marginLeft: 4 }}>
        Block: {idBlockSelected > 12 ? 'All blocks' : idBlockSelected}
      </div>
      {processing ? (
        <PlaceholderLoader className={classes.placeholderLoader} />
      ) : (
        imgResult
      )}
    </div>
  );
}

export default TwelveBlocksPanelAdmin;

const useStyle = makeStyles(() => ({
  twelveBlocks: {
    marginLeft: 100,
    marginTop: 10,
    maxWidth: 800,
  },
  dzBlock: {
    width: 1048,
    height: 90,
    backgroundColor: '#DDE542',
    marginLeft: 4,
  },
  placeholderLoader: {
    height: 246,
    padding: 0,
    margin: 0,
    '& span': {
      width: 40,
    },
  },
}));
