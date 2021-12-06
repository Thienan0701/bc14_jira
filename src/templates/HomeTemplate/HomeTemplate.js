import { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import SideNavHome from "./_components/sidebar_home/Sidebar_home";
import "./_components/sidebar_home/sidebar.css";

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
              <SideNavHome {...propsRoute} />
              <div class="content-container">
                <Component {...propsRoute} />
              </div>
            </Fragment>
          );
        } // redirect ve login
        return <Redirect to="/login" />;
      }}
    />
  );
};
