import { EMPTY_ARRAY } from '@tekion/tekion-base/app.constants';
import { FIELDS } from './atoms/AddMeetingDrawer/AddMeeting.constants';

export const initialState = {
  uploadList: EMPTY_ARRAY,
};

export function storeReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case FIELDS.UPLOAD_INITIATE_RESPONSE: return { ...state, uploadList: payload };
    default:
      return state;
  }
}
