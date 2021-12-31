import * as ActionTypes from "./constants";
const initialState = {
  dataPriority: null,
  dataTaskType: null,
  dataStatusTask: null,
  dataProjectCategory: null,
  dataAllProject: null,
  dataUserByProjectId: null,
};

const modalCreateIssueReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_PRIORITY_SUCCESS:
      return { ...state, dataPriority: payload };
    case ActionTypes.GET_TASK_TYPE_SUCCESS:
      return { ...state, dataTaskType: payload };
    case ActionTypes.GET_ALL_PROJECT_SUCCESS:
      return { ...state, dataAllProject: payload };
    case ActionTypes.GET_USER_BY_PROJECT_ID_SUCCESS:
      return { ...state, dataUserByProjectId: payload };
    case ActionTypes.GET_STATUS_TASK_SUCCESS:
      return { ...state, dataStatusTask: payload };
    default:
      return state;
  }
};
export default modalCreateIssueReducer;
