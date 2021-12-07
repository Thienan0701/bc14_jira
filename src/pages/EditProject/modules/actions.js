import api from "../../../utils/apiUtils";
import * as actTypes from "./constants";

export const actGetDetailProject = (id) => {
  return (dispatch) => {
    dispatch(actDetailProjectRequest());
    dispatch(actGetCategory());

    api
      .get(`Project/getProjectDetail?id=${id}`)
      .then((result) => {
        dispatch(actDetailProjectSuccess(result.data.content));
      })
      .catch((error) => {
        dispatch(actDetailProjectFailed(error));
      });
  };
};

const actDetailProjectRequest = () => {
  return {
    type: actTypes.PROJECT_DETAIL_REQUEST,
  };
};
const actDetailProjectSuccess = (data) => {
  return {
    type: actTypes.PROJECT_DETAIL_SUCCESS,
    payload: data,
  };
};
const actDetailProjectFailed = (error) => {
  return {
    type: actTypes.PROJECT_DETAIL_FAILED,
    payload: error,
  };
};

export const actGetCategory = () => {
  return (dispatch) => {
    api
      .get(`ProjectCategory`)
      .then((result) => {
        dispatch(actCategorySuccess(result.data.content));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const actCategorySuccess = (data) => {
  return {
    type: actTypes.PROJECT_CATEGORY_SUCCESS,
    payload: data,
  };
};

//Edit project
export const actEditProject = (id, project, history) => {
  return (dispatch) => {
    api
      .put(`Project/updateProject?projectId=${id}`, project)
      .then((result) => {
        dispatch(actEditSuccess(result.data.content));
        history.replace("/");
      })
      .catch((error) => {
        dispatch(actEditFailed(error));
      });
  };
};

const actEditSuccess = (data) => {
  return {
    type: actTypes.EDIT_SUCCESS,
    payload: data,
  };
};

const actEditFailed = (error) => {
  return {
    type: actTypes.EDIT_FAILED,
    payload: error,
  };
};
