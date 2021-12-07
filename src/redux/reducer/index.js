import { combineReducers } from "redux";
import loginReducer from "../../pages/Login/modules/reducer";
import homeReducer from "../../pages/Home/modules/reducer";
import editProjectReducer from "../../pages/EditProject/modules/reducer";
import registerReducer from "../../pages/Register/modules/reducer";

//store tong
const rootReducer = combineReducers({
  loginReducer,
  homeReducer,
  editProjectReducer,
  registerReducer,
});

export default rootReducer;
