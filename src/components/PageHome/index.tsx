import React from 'react';
import DiscoverTop from './DiscoverTop';
import { DataCategories } from 'types/categories';
import CTAComponent, {
  ICTAComponentProps,
} from 'components/common/CTAComponent';
import { ReactComponent as ExploreIcon } from 'assets/rocket-solid.svg';
import { useHistory } from 'react-router-dom';
export interface PageHomeProps {
  allCategories: DataCategories[];
}

export default function PageHome(props: PageHomeProps) {
  const { allCategories } = props;
  const history = useHistory();
  const ctaField: ICTAComponentProps = {
    headTitle: "What's NFT AdvertiseX?",
    subHeadTitle:
      'The front page of /NFT. Learn more in our About page and start selling your NFTs with no hidden fees today.',
    firstTitleButton: 'ABOUT',
    secondTitleButton: 'EXPLORE',
    iconButton: <ExploreIcon color="#FFFFFF" width={24} height={24} />,
    iconPosition: 'end',
    handleClickFirstBtn: () => history.push('/'),
    handleClickSecondBtn: () => history.push('/nft'),
  };

  return (
    <div>
      <DiscoverTop categories={allCategories} />
      <CTAComponent {...ctaField} />
    </div>
  );
}
