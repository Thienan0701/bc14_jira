import * as actType from "./constants";

import api from "../../../utils/apiUtils";

export const actFetchListProject = () => {
  //Goi Api trong nay
  return (dispatch) => {
    dispatch(actListProjectRequest());
    api
      .get("Project/getAllProject")
      .then((result) => {
        dispatch(actListProjectSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actListProjectFailed(error));
      });
  };
};
const actListProjectRequest = () => {
  return {
    type: actType.HOME_LIST_REQUEST,
  };
};

const actListProjectSuccess = (data) => {
  return {
    type: actType.HOME_LIST_SUCCESS,
    payload: data,
  };
};
const actListProjectFailed = (error) => {
  return {
    type: actType.HOME_LIST_FAILED,
    payload: error,
  };
};
//Delete project
export const actDeleteProject = (id) => {
  return (dispatch) => {
    api
      .delete(`Project/deleteProject?projectId=${id}`)
      .then((result) => {
        dispatch(actDeleteProjectSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actDeleteProjectFailed(error));
      });
  };
};

const actDeleteProjectSuccess = (data) => {
  return {
    type: actType.DELETE_SUCCESS,
    payload: data,
  };
};
const actDeleteProjectFailed = (error) => {
  return {
    type: actType.DELETE_FAILED,
    payload: error,
  };
};
