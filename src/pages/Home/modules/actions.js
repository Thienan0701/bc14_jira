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
        console.log(result);
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

//Search user
export const actSearchUser = (keyword) => {
  return (dispatch) => {
    api
      .get(`Users/getUser?keyword=${keyword}`)
      .then((result) => {
        dispatch(actSearchUserSuccess(result.data.content));
      })
      .catch((err) => {
        dispatch(actSearchUserFailed(err));
      });
  };
};
const actSearchUserSuccess = (data) => {
  return {
    type: actType.SEARCH_USER_SUCCESS,
    payload: data,
  };
};

const actSearchUserFailed = (err) => {
  return {
    type: actType.SEARCH_USER_FAILED,
    payload: err,
  };
};

//adduser to project
export const actAsignUserProject = (object) => {
  return (dispatch) => {
    api
      .post("Project/assignUserProject", object)
      .then((result) => {
        dispatch(actAsignUserSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actAsignUserFailed(error));
      });
  };
};

const actAsignUserSuccess = (data) => {
  return {
    type: actType.ASIGN_USER_PROJECT_SUCCESS,
    payload: data,
  };
};

const actAsignUserFailed = (err) => {
  return {
    type: actType.ASIGN_USER_PROJECT_FAILED,
    payload: err,
  };
};
