import * as ActionType from "./constants";

let userLogin = null;
let whatHappen = "";
if (localStorage.getItem("UserLogin"))
  userLogin = JSON.parse(localStorage.getItem("UserLogin"));
if (localStorage.getItem("WHAT_HAPPEN"))
  whatHappen = localStorage.getItem("WHAT_HAPPEN");

if (whatHappen && userLogin) {
} else {
  userLogin = null;
  whatHappen = "";
  localStorage.removeItem("UserLogin");
  localStorage.removeItem("WHAT_HAPPEN");
}

const initialState = {
  data: userLogin,
  loading: false,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case ActionType.LOGIN_SUCCESS:
      state.loading = false;
      state.data = action.payload;
      state.error = null;
      return { ...state };

    case ActionType.LOGIN_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.payload;
      return { ...state };

    case ActionType.LOGOUT:
      localStorage.removeItem("UserLogin");
      localStorage.removeItem("WHAT_HAPPEN");
      localStorage.removeItem("exp");
      return { ...state, data: null, loading: false, error: null };
    case ActionType.RESET_REDUCER:
      state.data = null;
      state.loading = false;
      state.error = null;
      return { ...state };
    default:
      return { ...state };
  }
};
export default loginReducer;
