import { combineReducers } from "redux";
import loginReducer from "../../pages/Login/modules/reducer";
import homeReducer from "../../pages/Home/modules/reducer";
import registerReducer from "../../pages/Register/modules/reducer";
import usermanageReducer from "../../pages/UserManage/modules/reducer";
import projectDetailReducer from "../../pages/ProjectDetail/modules/reducer";
import { drawerCommonReducer } from "../../components/DrawerCommon/modules/reducer";
import modalCreateIssueReducer from "../../components/ModalCreateTask/modules/reducer";
//store tong
const rootReducer = combineReducers({
  loginReducer,
  homeReducer,
  registerReducer,
  usermanageReducer,
  projectDetailReducer,
  drawerCommonReducer,
  modalCreateIssueReducer,
});

export default rootReducer;
