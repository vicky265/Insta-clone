import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '@tekion/tap-components/constants/Constants';
import FeatureItem from '../../../../../organisms/FeatureItem/FeatureItem';
import ItemList from '../../../../../common/molecules/ItemList/ItemList';

const DealerGroupList = ({
  columnsWidthHash,
  actions,
  dealersSort,
  dealerFields,
}) => {
  const fieldHeaderProps = useMemo(() => {
    const config = {
      columnsWidthHash: columnsWidthHash || {},
      setColumnsWidth: actions.setColumnsWidth,
      itemSort: dealersSort || {},
      handleSortClick: column => actions.setDealersSort({ field: column?.id, order: dealersSort?.order === 'asc' ? 'desc' : 'asc' }),
    };
    config.fieldColumns = dealerFields?.filter(item => item?.isActive).map((field) => {
      const {
        id = 0, fieldName = '', allowSorting = false, fieldInputType = '', isMandatory = false, frozen = false,
      } = field;
      return {
        id, fieldName, allowSorting, fieldInputType, isMandatory, isActive: true, width: frozen ? 500 : 200, frozen,
      };
    });
    config.minResizeWidth = 125;
    return config;
  }, [dealerFields, dealersSort, columnsWidthHash]);

  return (
    <>
      <ItemList
        ItemWrapperComponent={FeatureItem}
        itemFieldHeaderProps={fieldHeaderProps}
      />
    </>
  );
};

DealerGroupList.propTypes = {
  columnsWidthHash: PropTypes.object,
  actions: PropTypes.object,
  dealersSort: PropTypes.object,
  dealerFields: PropTypes.array,
};

DealerGroupList.defaultProps = {
  columnsWidthHash: EMPTY_OBJECT,
  actions: EMPTY_OBJECT,
  dealersSort: EMPTY_OBJECT,
  dealerFields: EMPTY_ARRAY,
};

export default DealerGroupList;
