import "./App.css";

import { Suspense, lazy } from "react";

import { BrowserRouter, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";

import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import DrawerCommon from "./components/DrawerCommon/DrawerCommon";

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
        {/* <HomeTemplate
          path="/create-project"
          Component={lazy(() => import("./pages/CreateProject/CreateProject"))}
        />
        <HomeTemplate
          path="/edit/:id"
          Component={lazy(() => import("./pages/EditProject/EditProject"))}
        /> */}
        <HomeTemplate
          path="/user-manage"
          Component={lazy(() => import("./pages/UserManage/UserManage"))}
        />
        <HomeTemplate
          path="/project-detail/:id"
          Component={lazy(() => import("./pages/ProjectDetail/ProjectDetail"))}
        />
        <UserLoginTemplate
          path="/login"
          Component={lazy(() => import("./pages/Login/Login"))}
        />
        <UserLoginTemplate
          path="/register"
          Component={lazy(() => import("./pages/Register/Register"))}
        />
      </Switch>

      <DrawerCommon />
    </BrowserRouter>
  );
}

export default App;
