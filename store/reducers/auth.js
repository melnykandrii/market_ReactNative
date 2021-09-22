import { AUTHENTICATE, LOGOUT, SET_TRYAUTH } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  onTryAuth: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        onTryAuth: true,
      };
    case SET_TRYAUTH:
      return {
        ...state,
        onTryAuth: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        onTryAuth: true,
      };
    default:
      return state;
  }
};
