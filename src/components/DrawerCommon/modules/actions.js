import * as ActionTypes from "./constants";
export const actOpenDrawerCommon = () => ({
  type: ActionTypes.DRAWER_COMMON_OPEN,
});

export const actCloseDrawerCommon = () => ({
  type: ActionTypes.DRAWER_COMMON_CLOSE,
});

export const setCallBack = (callback) => {
  return {
    type: ActionTypes.DRAWER_COMMON_SET_CALLBACK,
    payload: callback,
  };
};

export const setCallbackClose = (callback) => {
  return {
    type: ActionTypes.DRAWER_COMMON_SET_CALLBACK_CLOSE,
    payload: callback,
  };
};

export const actOpenDrawerCommonFull = (payload) => {
  return {
    type: ActionTypes.DRAWER_COMMON_OPEN_COMMON,
    payload,
  };
};

export const setCallbackFocus = (callback) => {
  return {
    type: ActionTypes.DRAWER_COMMON_SET_CALLBACK_FOCUS,
    payload: callback,
  };
};
