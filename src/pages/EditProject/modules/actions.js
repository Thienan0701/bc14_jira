import api from "../../../utils/apiUtils";
import * as actTypes from "./constants";

export const actFetchDetailProject = (id) => {
  return (dispatch) => {
    dispatch(actDetailProjectRequest());

    api
      .get(`QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
      .then((result) => {
        dispatch(actDetailProjectSuccess(result.data.content));
        console.log(result.data);
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
