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
