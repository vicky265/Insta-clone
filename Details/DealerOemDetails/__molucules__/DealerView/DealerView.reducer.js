import { EMPTY_ARRAY, EMPTY_OBJECT } from '@tekion/tap-components/constants/Constants';
import produce from 'immer';

import {
  SET_DEALER_DETAILS,
  SET_DEALER_FIELDS,
  SET_FEATURE_DETAILS,
  SET_DEALERS_DETAILS,
} from './DealerView.actionType';

const initialState = {
  dealerDetails: EMPTY_OBJECT,
  dealerFields: EMPTY_ARRAY,
  featureData: EMPTY_OBJECT,
  dealersSort: EMPTY_OBJECT,
};

export default (state = initialState, action) => {
  const { type, data } = action;
  return produce(state, (draft) => {
    switch (type) {
      case SET_DEALER_DETAILS:
        draft.dealerDetails = data || EMPTY_OBJECT;
        break;
      case SET_DEALER_FIELDS:
        draft.dealerFields = data || EMPTY_ARRAY;
        break;
      case SET_FEATURE_DETAILS:
        draft.featureData = data || EMPTY_ARRAY;
        break;
      case SET_DEALERS_DETAILS:
        draft.dealersSort = data || EMPTY_ARRAY;
        break;
      default:
    }
    return draft;
  });
};
