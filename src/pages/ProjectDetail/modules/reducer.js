import * as actType from "./constants";

const initialState = {
  data: null,
  loading: false,
  error: null,
  // taskDetail
  taskDetail: null,
  // status
  dataStatus: null,

  // priority
  dataPriority: null,

  // taskType
  dataTaskType: null,
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
        loading: false,
      };
    case actType.TASK_DETAIL_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
        taskDetail: null,
      };

    case actType.TASK_DETAIL_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        taskDetail: null,
      };

    default:
      return { ...state };
  }
};

export default projectDetailReducer;
