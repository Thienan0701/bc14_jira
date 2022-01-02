import "./App.css";

import { lazy } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";

import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import DrawerCommon from "./components/DrawerCommon/DrawerCommon";
import PageNotFound from "./templates/PageNotFound/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <HomeTemplate
          path="/"
          exact
          Component={lazy(() => import("./pages/Home/Home"))}
        />
        <HomeTemplate
          path="/project-management"
          Component={lazy(() => import("./pages/Home/Home"))}
        />
        <HomeTemplate
          path="/user-manage"
          Component={lazy(() => import("./pages/UserManage/UserManage"))}
        />
        <HomeTemplate
          path="/project-detail/:id"
          Component={lazy(() => import("./pages/ProjectDetail/ProjectDetail"))}
        />
        <HomeTemplate
          path="/profile"
          Component={lazy(() => import("./pages/Profile/Profile"))}
        />
        <UserLoginTemplate
          path="/login"
          Component={lazy(() => import("./pages/Login/Login"))}
        />
        <UserLoginTemplate
          path="/register"
          Component={lazy(() => import("./pages/Register/Register"))}
        />
        <Route path="*" component={PageNotFound} />
      </Switch>

      <DrawerCommon />
    </BrowserRouter>
  );
}

export default App;
