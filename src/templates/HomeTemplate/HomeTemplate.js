import React, { Suspense, useEffect, useState } from "react";
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
import ModalCreateTask from "../../components/ModalCreateTask/ModalCreateTask";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actLogout } from "../../pages/Login/modules/actions";

import Loading from "../../components/Loading";

const { Header, Content, Sider } = Layout;

export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: userLogin } = useSelector((state) => state.loginReducer);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        if (localStorage.getItem("UserLogin")) {
          return (
            <>
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
                      <Menu.Item
                        key="/profile"
                        onClick={() => {
                          propsRoute.history.push("/profile");
                        }}
                        icon={<UserOutlined />}
                      >
                        Profile
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          dispatch(actLogout());
                        }}
                        key="4"
                        icon={<PoweroffOutlined />}
                      >
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
                          src={userLogin?.avatar}
                          alt="avatar"
                          className="header-avatar"
                          onClick={() => {
                            propsRoute.history.push("/profile");
                          }}
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                        />
                      </div>
                    </Header>
                    <Content className="site-layout-background content-common">
                      <Suspense fallback={<Loading />}>
                        <Component
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          {...propsRoute}
                        />
                      </Suspense>
                    </Content>
                  </Layout>
                </Layout>
              </div>
              <ModalCreateTask
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                {...propsRoute}
              />
            </>
          );
        } // redirect ve login
        return <Redirect to="/login" />;
      }}
    />
  );
};
