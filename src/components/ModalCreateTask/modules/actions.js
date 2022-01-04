import { actFetchListProject } from "../../../pages/Home/modules/actions";
import { actGetDetailProject } from "../../../pages/ProjectDetail/modules/actions";
import api from "../../../utils/apiUtils";
import * as actionTypes from "./constants";
export const actGetPriority = () => {
  return async (dispatch) => {
    try {
      const result = await api.get("Priority/getAll");
      dispatch(actGetPrioritySuccess(result.data.content));
    } catch (error) {}
  };
};
const actGetPrioritySuccess = (data) => ({
  type: actionTypes.GET_PRIORITY_SUCCESS,
  payload: data,
});

export const actGetTaskType = () => {
  return async (dispatch) => {
    try {
      const result = await api.get("TaskType/getAll");
      dispatch(actGetTaskTypeSuccess(result.data.content));
    } catch (error) {}
  };
};
const actGetTaskTypeSuccess = (data) => ({
  type: actionTypes.GET_TASK_TYPE_SUCCESS,
  payload: data,
});

export const actGetALlProject = () => {
  return async (dispatch) => {
    try {
      const result = await api.get("Project/getAllProject");
      dispatch(actGetALlProjectSuccess(result.data.content));
    } catch (error) {}
  };
};
const actGetALlProjectSuccess = (data) => ({
  type: actionTypes.GET_ALL_PROJECT_SUCCESS,
  payload: data,
});

export const actGetUserByProjectId = (id) => {
  return async (dispatch) => {
    try {
      const result = await api.get(`Users/getUserByProjectId?idProject=${id}`);
      dispatch(actGetUserByProjectIdSuccess(result.data.content));
    } catch (error) {
      if (error.response?.data.statusCode === 404) {
        dispatch(actGetUserByProjectIdSuccess(null));
      }
    }
  };
};
const actGetUserByProjectIdSuccess = (data) => ({
  type: actionTypes.GET_USER_BY_PROJECT_ID_SUCCESS,
  payload: data,
});

export const actGetStatusTask = () => {
  return async (dispatch) => {
    try {
      const result = await api.get(`Status/getAll`);
      dispatch(actGetStatusTaskSuccess(result.data.content));
    } catch (error) {}
  };
};
const actGetStatusTaskSuccess = (data) => ({
  type: actionTypes.GET_STATUS_TASK_SUCCESS,
  payload: data,
});

export const actCreateTask = (data, setIsOpen, message, isHome, history) => {
  return async (dispatch) => {
    try {
      await api.post(`Project/createTask`, data);
      setIsOpen(false);
      message.success("Create task success!", 2.5);
      if (isHome) {
        dispatch(actFetchListProject());
      } else {
        dispatch(actGetDetailProject(data.projectId, history));
      }
    } catch (error) {
      if (error.response?.data.content === "task already exists!") {
        message.error("Task already exists!", 2.5);
      } else {
        message.error(error.response?.data.content, 2.5);
      }
    }
  };
};
