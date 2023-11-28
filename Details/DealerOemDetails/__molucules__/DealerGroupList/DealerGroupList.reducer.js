import { EMPTY_OBJECT } from '@tekion/tap-components/constants/Constants';
import produce from 'immer';
import {
  SET_COLUMNS_WIDTH_HASH,
} from './DealerGroupList.actionType';

const initialState = {
  columnsWidthHash: EMPTY_OBJECT,
};

export default (state = initialState, action) => {
  const { type, data } = action;
  return produce(state, (draft) => {
    switch (type) {
      case SET_COLUMNS_WIDTH_HASH:
        draft.columnsWidthHash = data || EMPTY_OBJECT;
        break;
      default:
        break;
    }
    return draft;
  });
};
