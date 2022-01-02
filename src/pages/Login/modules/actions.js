import * as ActionType from "./constants";
import api from "./../../../utils/apiUtils";
const bcryptjs = require("bcryptjs");

const TIME_EXPIRE = 3600000;

export const actLoginApi = (user, history) => {
  return (dispatch) => {
    dispatch(actLoginRequest());
    api
      .post("Users/signin", user)
      .then((result) => {
        //Tg het phien
        const date = new Date().getTime();
        const expire = date + TIME_EXPIRE;
        //luu thoi gian het phien-> localStorage
        localStorage.setItem("exp", expire);

        // hashPassword
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(user.password, salt);
        localStorage.setItem("WHAT_HAPPEN", hashPassword);

        //Luu trang thai login -> Local Storage
        localStorage.setItem("UserLogin", JSON.stringify(result.data.content));

        //chuyen trang neu login thanh cong
        history.replace("/");
        // history.goBack();

        dispatch(actLoginSuccess(result.data.content));
      })
      .catch((errors) => {
        dispatch(actLoginFailed(errors));
      });
  };
};
const actLoginRequest = () => {
  return {
    type: ActionType.LOGIN_REQUEST,
  };
};

const actLoginSuccess = (data) => {
  return {
    type: ActionType.LOGIN_SUCCESS,
    payload: data,
  };
};

const actLoginFailed = (error) => {
  return {
    type: ActionType.LOGIN_FAILED,
    payload: error,
  };
};
