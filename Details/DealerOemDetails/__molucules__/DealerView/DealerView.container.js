import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DealerView from './DealerView';
import {
  fetchDealerDetails,
  resetDealerData,
  setFeatureData,
} from './DealerView.actionHandlers';
import { getDealerDetails, getDealerFields, getFeatureData } from './DealerView.selector';

const mapStateToProps = state => ({
  featureDetails: getDealerDetails(state),
  featureData: getFeatureData(state),
  dealerFields: getDealerFields(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchDealerDetails,
    resetDealerData,
    setFeatureData,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DealerView);
