// create reducer
import * as ActionTypes from "./constants";
const initial = {
  open: false,
  title: "Hihi",
  ComponentContentDrawer: <p>hihi</p>,
  callBackSubmit: () => {
    // alert("hihi");
  },
  callbackClose: () => {},
  callbackFocus: () => {},
};

export const drawerCommonReducer = (state = initial, action) => {
  switch (action.type) {
    case ActionTypes.DRAWER_COMMON_OPEN:
      return {
        ...state,
        open: true,
      };
    case ActionTypes.DRAWER_COMMON_CLOSE:
      return {
        ...state,
        open: false,
      };

    case ActionTypes.DRAWER_COMMON_SET_CALLBACK:
      return {
        ...state,
        callBackSubmit: action.payload,
      };
    case ActionTypes.DRAWER_COMMON_SET_CALLBACK_CLOSE:
      return {
        ...state,
        callbackClose: action.payload,
      };

    case ActionTypes.DRAWER_COMMON_OPEN_COMMON:
      state.open = true;
      state.title = action.payload.title;
      state.ComponentContentDrawer = action.payload.component;
      state.callBackSubmit = action.payload.callBack;
      return { ...state };
    case ActionTypes.DRAWER_COMMON_SET_CALLBACK_FOCUS:
      return {
        ...state,
        callbackFocus: action.payload,
      };

    default:
      return state;
  }
};
