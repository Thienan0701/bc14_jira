import { combineReducers } from "redux";
import loginReducer from "../../pages/Login/modules/reducer";

//store tong
const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;
