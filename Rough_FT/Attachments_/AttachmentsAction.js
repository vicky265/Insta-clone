import { ADD_ATTACHMENT } from '../../constants';

export const addAttachment = attachment => ({
  type: ADD_ATTACHMENT,
  payload: attachment,
});
