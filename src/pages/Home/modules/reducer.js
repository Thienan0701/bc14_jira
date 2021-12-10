import * as ActionType from "./constants";

const initialState = {
  data: null,
  loading: false,
  error: null,

  //delete project
  deleteResult: null,
  deleteError: null,

  //search user to add
  searchdata: null,
  searcherr: null,

  //Asign user to project
  asignResult: null,
  asignErr: null,

  //delete user from project
  deleteUserResult: null,
  deleteUserErr: null,
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

    case ActionType.DELETE_SUCCESS:
      state.deleteResult = action.payload;
      state.deleteError = null;
      return { ...state };

    case ActionType.DELETE_FAILED:
      state.deleteResult = null;
      state.deleteError = action.payload;
      return { ...state };

    case ActionType.SEARCH_USER_SUCCESS:
      state.searchdata = action.payload;
      return { ...state };

    case ActionType.SEARCH_USER_FAILED:
      state.searchdata = null;
      state.searcherr = action.payload;
      return { ...state };

    case ActionType.ASIGN_USER_PROJECT_SUCCESS:
      state.asignResult = action.payload;
      state.asignErr = null;
      return { ...state };

    case ActionType.ASIGN_USER_PROJECT_FAILED:
      state.asignResult = null;
      state.asignErr = action.payload;
      return { ...state };

    case ActionType.DELETE_USER_PROJECT_SUCCESS:
      state.deleteUserResult = action.payload;
      state.deleteUserErr = null;
      return { ...state };

    case ActionType.DELETE_USER_PROJECT_FAILED:
      state.deleteUserResult = null;
      state.deleteUserErr = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default homeReducer;
