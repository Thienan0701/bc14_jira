import React from "react";
import { Route } from "react-router";
import { Suspense } from "react";
import "./style.scss";
import logoJira from "./../../assets/images/login-jira-screen-short.png";
import imgFooterLeft from "./../../assets/images/jira-left.d0ab0e98.svg";
import imgFooterRight from "./../../assets/images/jira-right.9746753a.svg";
import Loading from "../../components/Loading/index";
export const UserLoginTemplate = (props) => {
  const { Component, ...restProps } = props;
  const pathname = props.location.pathname;
  console.log(pathname);
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <div className="login-template">
            <div
              className="top"
              style={{
                display: pathname === "/register" ? "none" : "block",
              }}
            >
              <img srcSet={`${logoJira} 2x`} alt="" />
            </div>
            <div className="login-container">
              <div className="login-content">
                <Suspense fallback={<Loading />}>
                  <Component {...propsRoute} />
                </Suspense>
              </div>
            </div>
            <footer>
              <img src={imgFooterLeft} alt="" />
              <img src={imgFooterRight} alt="" />
            </footer>
          </div>
        );
      }}
    />
  );
};
