import * as actType from "./constants";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const editProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actType.PROJECT_DETAIL_REQUEST:
      state.data = null;
      state.loading = true;
      state.error = null;
      return { ...state };

    case actType.PROJECT_DETAIL_SUCCESS:
      state.data = action.payload;
      state.error = null;
      state.loading = false;
      return { ...state };

    case actType.PROJECT_DETAIL_FAILED:
      state.data = null;
      state.error = action.payload;
      state.loading = false;
      return { ...state };

    default:
      return { ...state };
  }
};

export default editProjectReducer;
