import { lazy } from "react";
import { HomeTemplate } from "../templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "../templates/LoginTemplate/UserLoginTemplate";

const routeHome = [
  {
    path: "/",
    Component: lazy(() => import("../pages/Home/Home")),
    exact: true,
  },
  {
    path: "/project-management",
    Component: lazy(() => import("../pages/Home/Home")),
    exact: true,
  },
  {
    path: "/user-manage",
    Component: lazy(() => import("../pages/UserManage/UserManage")),
    exact: true,
  },
  {
    path: "/project-detail/:id",
    Component: lazy(() => import("../pages/ProjectDetail/ProjectDetail")),
    exact: true,
  },
  {
    path: "/profile",
    Component: lazy(() => import("../pages/Profile/Profile")),
    exact: true,
  },
];

const routeUser = [
  {
    path: "/login",
    Component: lazy(() => import("../pages/Login/Login")),
    exact: true,
  },
  {
    path: "/register",
    Component: lazy(() => import("../pages/Register/Register")),
    exact: true,
  },
];

export const renderRouteHome = () => {
  return routeHome.map((route, key) => {
    return (
      <HomeTemplate
        key={key}
        exact={route.exact}
        Component={route.Component}
        path={route.path}
      />
    );
  });
};

export const renderRouteUser = () => {
  return routeUser.map((route, key) => {
    return (
      <UserLoginTemplate
        key={key}
        exact={route.exact}
        Component={route.Component}
        path={route.path}
      />
    );
  });
};
