import * as ActionType from "./constants";

const initialState = {
  data: null,
  loading: false,
  error: null,
};
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.HOME_LIST_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ActionType.HOME_LIST_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case ActionType.HOME_LIST_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};
export default homeReducer;
