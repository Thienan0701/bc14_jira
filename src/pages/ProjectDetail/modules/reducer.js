import * as actType from "./constants";

const initialState = {
  data: null,
  loading: false,
  error: null,
  // taskDetail
  taskDetail: null,
  isLoadingTaskDetail: false,

  // status
  dataStatus: null,

  // priority
  dataPriority: null,

  // taskType
  dataTaskType: null,

  // list user search
  listUserSearch: null,
};

const projectDetailReducer = (state = initialState, action) => {
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

    case actType.DATA_STATUS_SUCCESS:
      return { ...state, dataStatus: action.payload };
    case actType.DATA_PRIORITY_SUCCESS:
      return { ...state, dataPriority: action.payload };
    case actType.DATA_TASK_TYPE_SUCCESS:
      return { ...state, dataTaskType: action.payload };
    case actType.TASK_DETAIL_SUCCESS:
      return {
        ...state,
        taskDetail: action.payload,
        error: null,
        isLoadingTaskDetail: false,
      };
    case actType.TASK_DETAIL_REQUEST:
      return {
        ...state,
        error: null,
        isLoadingTaskDetail: true,
        taskDetail: null,
      };

    case actType.TASK_DETAIL_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoadingTaskDetail: false,
        taskDetail: null,
      };
    case actType.SEARCH_USER_SUCCESS:
      return { ...state, listUserSearch: action.payload, error: null };
    case actType.SEARCH_USER_FAILED:
      return { ...state, listUserSearch: null, error: action.payload };
    default:
      return { ...state };
  }
};

export default projectDetailReducer;
