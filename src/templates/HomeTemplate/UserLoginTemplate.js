import React, { Fragment } from "react";
import { Route } from "react-router";
import { Layout } from "antd";
import { Suspense } from "react";

const { Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
  const { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout style={{ height: window.innerHeight }}>
              <Sider
                style={{
                  height: window.innerHeight,
                  width: window.innerWidth,
                  backgroundImage: `url(https://picsum.photos/700)`,
                }}
              ></Sider>
              <Content>
                <Suspense fallback={<div>Loading...</div>}>
                  <Component {...propsRoute} />
                </Suspense>
              </Content>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};
