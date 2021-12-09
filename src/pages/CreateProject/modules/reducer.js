import * as actType from "./constants";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const createProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actType.CREATE_PROJECT_REQUEST:
      state.data = null;
      state.loading = true;
      state.error = null;
      return { ...state };

    case actType.CREATE_PROJECT_SUCCESS:
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case actType.CREATE_PROJECT_FAILED:
      state.error = action.payload;
      state.data = null;
      return { ...state };
    default:
      return { ...state };
  }
};

export default createProjectReducer;
