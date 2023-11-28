import {
  EMPTY_OBJECT,
  NO_OP,
  EMPTY_ARRAY,
} from '@tekion/tap-components/constants/Constants';

import {
  SET_DEALER_DETAILS,
  SET_DEALER_FIELDS,
  SET_FEATURE_DETAILS,
  SET_DEALERS_SORT,
} from './DealerView.actionType';
// import { getFeatureTrackerInfoOnID } from './DealerView.api';
import { featureDetail } from './DealerView.constant';
import { fetchBoardDetailsApi } from '../../../../BoardView/Board.api';

export const setDealerFields = data => ({ type: SET_DEALER_FIELDS, data });
export const setDealerDetails = data => ({ type: SET_DEALER_DETAILS, data });
export const setFeatureDetails = data => ({ type: SET_FEATURE_DETAILS, data });
export const setDealersSort = data => ({ type: SET_DEALERS_SORT, data });

export const fetchDealerDetails = (payload, callBackFunc = NO_OP) => (dispatch) => {
  const { feature_id } = payload;
  fetchBoardDetailsApi(feature_id).then(({ data = {} }) => {
    const { fields = EMPTY_ARRAY, ...restData } = data;
    dispatch(setDealerDetails(restData));
    dispatch(setDealerFields(fields));
    callBackFunc('success');
  }, error => callBackFunc('error', error));
};

export const resetDealerData = () => (dispatch) => {
  dispatch(setDealerDetails(EMPTY_OBJECT));
  dispatch(setDealerFields(EMPTY_ARRAY));
  dispatch(setDealersSort(EMPTY_OBJECT));
};

export const setFeatureData = (callBackFunc = NO_OP) => (dispatch) => {
  dispatch(setFeatureDetails(featureDetail));
  callBackFunc('success');
};
