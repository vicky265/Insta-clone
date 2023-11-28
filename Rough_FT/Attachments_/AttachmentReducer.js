import { ADD_ATTACHMENT } from '../../constants';

const initialState = {
  attachments: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ATTACHMENT:
      return {
        ...state,
        attachments: [...state.attachments, action.payload],
      };
    default:
      return state;
  }
}
