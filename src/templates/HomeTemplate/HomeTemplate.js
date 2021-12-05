import { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import SideNavHome from "./_components/sidebar_home/Sidebar_home";

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // propsRout  .match .history .location
        if (localStorage.getItem("UserLogin")) {
          return (
            <Fragment>
              {/* <SideNavHome {...propsRoute} /> */}
              <Component {...propsRoute} />
            </Fragment>
          );
        } // redirect ve login
        return <Redirect to="/login" />;
      }}
    />
  );
};
