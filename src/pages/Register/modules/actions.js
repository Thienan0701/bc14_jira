import * as actTypes from "./constants";
import api from "./../../../utils/apiUtils";

export const actRegister = (user, history, message) => {
  return (dispatch) => {
    dispatch(actRegisterRequest());
    api
      .post("Users/signup", user)
      .then((result) => {
        dispatch(actRegisterSuccess(result.data.content));
        message.success("Successful account registration!");
        history.replace("/login");
      })
      .catch((error) => {
        dispatch(actRegisterFailed(error));
      });
  };
};

const actRegisterRequest = () => {
  return {
    type: actTypes.REGISTER_REQUEST,
  };
};

const actRegisterSuccess = (data) => {
  return {
    type: actTypes.REGISTER_SUCCESS,
    payload: data,
  };
};
const actRegisterFailed = (error) => {
  return {
    type: actTypes.REGISTER_FAILED,
    payload: error,
  };
};

export const actResetReducer = () => ({ type: actTypes.RESET_REDUCER });
