import React, { Suspense, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import logoJira from "../../assets/images/sd-integrations-logo-jira.png";
import "./_components/sidebar_home/sidebar.scss";
import "./index.scss";
import { Layout, Menu } from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
const { Header, Content, Sider } = Layout;

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        if (localStorage.getItem("UserLogin")) {
          return (
            <div className="home-common">
              <Layout>
                <Sider
                  style={{ background: "#FAFBFC" }}
                  trigger={null}
                  collapsible
                  collapsed={collapsed}
                >
                  <img src={logoJira} alt="" className="logo-jira-common" />
                  <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={[`${window.location.pathname}`]}
                  >
                    <Menu.Item
                      key="/"
                      onClick={() => {
                        propsRoute.history.push("/");
                      }}
                      icon={<ProjectOutlined />}
                    >
                      Projects
                    </Menu.Item>
                    <Menu.Item
                      key="/user-manage"
                      onClick={() => {
                        propsRoute.history.push("/user-manage");
                      }}
                      icon={<UsergroupAddOutlined />}
                    >
                      Users
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                      Profile
                    </Menu.Item>
                    <Menu.Item key="4" icon={<PoweroffOutlined />}>
                      Logout
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Layout className="site-layout">
                  <Header
                    className="site-layout-background"
                    style={{
                      background: "#fff",
                      padding: "0 1rem",
                      justifyContent: " space-between",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {React.createElement(
                      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                      {
                        className: "trigger",
                        onClick: () => setCollapsed(!collapsed),
                      }
                    )}
                    <div>
                      <img
                        src="https://picsum.photos/30/30"
                        alt="avatar"
                        className="header-avatar"
                      />
                    </div>
                  </Header>
                  <Content className="site-layout-background content-common">
                    <Suspense fallback={<div>Loading...</div>}>
                      <Component {...propsRoute} />
                    </Suspense>
                  </Content>
                </Layout>
              </Layout>
            </div>
          );
        } // redirect ve login
        return <Redirect to="/login" />;
      }}
    />
  );
};
