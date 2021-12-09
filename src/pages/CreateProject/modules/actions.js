import api from "../../../utils/apiUtils";
import * as actTypes from "./constants";
export const actCreateProject = (project, history) => {
  return (dispatch) => {
    api
      .post(`Project/createProjectAuthorize`, project)
      .then((result) => {
        dispatch(actCreateSuccess(result.data.content));
        history.replace("/");
      })
      .catch((error) => {
        dispatch(actCreateFailed(error));
      });
  };
};

const actCreateSuccess = (data) => {
  return {
    type: actTypes.CREATE_PROJECT_SUCCESS,
    payload: data,
  };
};

const actCreateFailed = (error) => {
  return {
    type: actTypes.CREATE_PROJECT_FAILED,
    payload: error,
  };
};
