import * as actTypes from "./constant";

const initialState = {
  data: null,
  loading: false,
  error: null,
};
const usermanageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actTypes.LIST_USER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case actTypes.LIST_USER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case actTypes.LIST_USER_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};
export default usermanageReducer;
