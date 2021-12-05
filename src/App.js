import { createBrowserHistory } from "history";
import "./App.css";

import { Suspense, lazy } from "react";

import { BrowserRouter, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";

import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={history}>
      <Suspense fallback={<div>Loading...</div>}>
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
          <UserLoginTemplate
            path="/login"
            Component={lazy(() => import("./pages/Login/Login"))}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
