import React, { useState } from "react";
import { Button } from "antd";
import { FacebookOutlined } from "@ant-design/icons";
import { withFormik } from "formik";
import { useDispatch } from "react-redux";
import { actLoginApi } from "./modules/actions";

function Login(props) {
  const { errors } = props;

  const [state, setstate] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setstate({
      ...state,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(state);
    dispatch(actLoginApi(state, props.history));
  };

  return (
    <div className="container" style={{ height: window.innerHeight }}>
      <h3 className="d-flex justify-content-center">Login</h3>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            onChange={handleOnchange}
          />
          <div className="text-danger">{errors.email}</div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleOnchange}
          />
          <div className="text-danger">{errors.password}</div>
        </div>
        <div className=" mt-2 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
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

const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  // Custom sync validation
  validate: (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  },

  displayName: "Login",
})(Login);

export default LoginWithFormik;
