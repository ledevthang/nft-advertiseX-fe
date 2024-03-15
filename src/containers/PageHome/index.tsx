import React, { useCallback, useEffect } from 'react';
import PageHome from 'components/PageHome';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTableCategoriesAction,
  getAllCategoriesAction,
} from 'store/actions/categoriesActions';
import { getAllCategories } from 'store/selectors';
import { SortEnum } from 'enums/sortEnum';
import { ParamsSortBy } from 'enums/categories';
import useTitle from 'hooks/useTitle';

export default function PageHomeContainer() {
  const dispatch = useDispatch();
  const allCategories = useSelector(getAllCategories);

  const handleGetAllCategories = useCallback(() => {
    dispatch(
      getAllCategoriesAction({
        includeFirstPlaceImg: true,
        includeIcon: true,
        sortType: SortEnum.Desc,
        sortBy: ParamsSortBy.ALL_TIME,
      }),
    );
  }, [dispatch]);

  const handleGetTableCategories = useCallback(() => {
    dispatch(
      getTableCategoriesAction({
        includeIcon: true,
        sortType: SortEnum.Desc,
        sortBy: ParamsSortBy.ALL_TIME,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    handleGetAllCategories();
  }, [handleGetAllCategories]);

  useEffect(() => {
    handleGetTableCategories();
  }, [handleGetTableCategories]);

  useTitle('NFT AdvertiseX - 1001 Squares of NFT');

  return (
    <>
      <PageHome allCategories={allCategories.data} />
    </>
  );
}
