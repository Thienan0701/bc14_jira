import { combineReducers } from "redux";
import loginReducer from "../../pages/Login/modules/reducer";
import homeReducer from "../../pages/Home/modules/reducer";

//store tong
const rootReducer = combineReducers({
  loginReducer,
  homeReducer,
});

export default rootReducer;
