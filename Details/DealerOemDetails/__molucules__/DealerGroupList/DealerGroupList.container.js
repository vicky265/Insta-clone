import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DealerGroupList from './DealerGroupList';
import { getColumnsWidthHash } from './DealerGroupList.selector';
import { getDealersSort, getDealerFields, getFeatureData } from '../DealerView/DealerView.selector';
import { setColumnsWidth } from './DealerGroupList.actionHandler';
import { setDealersSort } from '../DealerView/DealerView.actionHandlers';

const mapStateToProps = state => ({
  columnsWidthHash: getColumnsWidthHash(state),
  dealersSort: getDealersSort(state),
  dealerFields: getDealerFields(state),
  featureData: getFeatureData(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setColumnsWidth,
    setDealersSort,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DealerGroupList);
