import * as actTypes from "./constant";

const initialState = {
  data: null,
  loading: false,
  error: null,

  //delete user
  deleteResult: null,
  deleteErr: null,

  //filter
  dataDefault: null,
  keyword: null,
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
      state.dataDefault = action.payload;
      state.error = null;
      return { ...state };

    case actTypes.LIST_USER_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    case actTypes.DELETE_USER_SUCCESS:
      state.deleteResult = action.payload;
      state.deleteErr = null;
      return { ...state };
    case actTypes.DELETE_USER_FAILED:
      state.deleteResult = null;
      state.deleteErr = action.payload;
      return { ...state };

    case actTypes.FILTER_USER:
      state.keyword = action.payload;
      state.data = state.dataDefault.filter((user) => {
        return (
          user.name.toLowerCase().indexOf(state.keyword.toLowerCase()) !== -1
        );
      });
      return { ...state };
    default:
      return { ...state };
  }
};
export default usermanageReducer;
