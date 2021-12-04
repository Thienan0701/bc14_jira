import * as ActionType from "./constants";

const initialState = {
  data: null,
  loading: false,
  error: null,
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ActionType.LOGIN_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case ActionType.LOGIN_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};
export default loginReducer;
