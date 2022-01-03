import * as actTypes from "./constants";

const initialState = {
  data: null,
  loading: false,
  error: null,
};
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actTypes.REGISTER_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case actTypes.REGISTER_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case actTypes.REGISTER_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };
    case actTypes.RESET_REDUCER:
      state.loading = false;
      state.data = null;
      state.error = null;
      return { ...state };
    default:
      return { ...state };
  }
};
export default registerReducer;
