import React, { useState } from "react";
import { Button } from "antd";
import { FacebookOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actLoginApi } from "./modules/actions";

import { Link } from "react-router-dom";

function Login(props) {
  const [state, setState] = useState({
    values: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
    emailValid: false,
    passwordValid: false,
    formValid: false, //form chua hop le
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      values: { ...state.values, [name]: value },
    });
  };

  const handleErors = (e) => {
    const { name, value } = e.target;
    let mess = value.trim() === "" ? name + " không được rỗng" : "";
    let { emailValid, passwordValid } = state;

    switch (name) {
      case "email":
        emailValid = mess === "" ? true : false;
        if (value && !value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
          mess = " Email chưa đúng định dạng";
          emailValid = false;
        }
        break;
      case "password":
        passwordValid = mess === "" ? true : false;
        if (value.length <= 5 || value.length > 24) {
          mess = "độ dài password phải từ 6 đến 24";
          passwordValid = false;
        }
        break;

      default:
        break;
    }
    setState({
      ...state,
      errors: { ...state.errors, [name]: mess },
      emailValid,
      passwordValid,
      formValid: emailValid && passwordValid,
    });
  };

  const dispatch = useDispatch();
  const error = useSelector((state) => state.loginReducer.error);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(actLoginApi(state.values, props.history));
  };

  //alert khi login fail
  const renderNoti = () => {
    return error && <div className="alert alert-danger">{error?.message}</div>;
  };

  return (
    <div className="container" style={{ height: window.innerHeight }}>
      <h3 className="d-flex justify-content-center">Login</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          {renderNoti()}
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={state.email}
            onBlur={handleErors}
            onChange={handleOnchange}
          />
          {state.errors.email ? (
            <div className="alert alert-danger">{state.errors.email}</div>
          ) : (
            " "
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={state.password}
            onBlur={handleErors}
            onChange={handleOnchange}
          />
          {state.errors.password ? (
            <div className="alert alert-danger">{state.errors.password}</div>
          ) : (
            " "
          )}
        </div>
        <div className="form-group ">
          <div className="row mt-2 d-flex justify-content-center">
            <button
              type="submit"
              disabled={!state.formValid}
              className="btn btn-primary"
            >
              Login
            </button>
            <Link type="button" className="btn btn-danger ml-1" to="/register">
              Register
            </Link>
          </div>
        </div>

        <div className="social mt-2 d-flex justify-content-center">
          <Button
            type="primary"
            shape="circle"
            icon={<FacebookOutlined />}
          ></Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
