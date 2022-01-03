import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import { Link } from "react-router-dom";
import "./Register.scss";
import { actRegister, actResetReducer } from "./modules/actions";
import { message } from "antd";
function Register(props) {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.registerReducer);

  let schema = yup.object().shape({
    name: yup.string().required("Name is a required field!"),
    email: yup
      .string()
      .required("Email is a required field!")
      .email("Email is invalid!"),
    phoneNumber: yup
      .string()
      .required("Phone number is a required field!")
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        "Phone number is invalid!"
      ),
    passWord: yup
      .string()
      .required("Password is a required field!")
      .min(8, "Password must be between 8 and 32 characters!")
      .max(32, "Password must be between 8 and 32 characters!"),
  });

  useEffect(() => {
    return () => {
      dispatch(actResetReducer());
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      dispatch(actRegister(values, props.history, message));
    },
  });

  return (
    <div className="register">
      <div className="title">Sign up for your account</div>
      <div className="form">
        {error ? (
          <span className="text-danger">{error.response?.data.message}</span>
        ) : (
          ""
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group-login">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={formik.values.name}
              className="input-global"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter name"
            />
            {formik.touched.name && formik.errors.name ? (
              <span className="text-danger">{formik.errors.name}</span>
            ) : (
              " "
            )}
          </div>
          <div className="form-group-login">
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              id="phoneNumber"
              value={formik.values.phoneNumber}
              className="input-global"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter phone number"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <span className="text-danger">{formik.errors.phoneNumber}</span>
            ) : (
              " "
            )}
          </div>
          <div className="form-group-login">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={formik.values.email}
              className="input-global"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="text-danger">{formik.errors.email}</span>
            ) : (
              " "
            )}
          </div>
          <div className="form-group-login">
            <label htmlFor="passWord">Password</label>
            <input
              className="input-global"
              type="passWord"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passWord}
              id="passWord"
              placeholder="Enter password"
            />
            {formik.touched.passWord && formik.errors.passWord ? (
              <span className="text-danger">{formik.errors.passWord}</span>
            ) : (
              " "
            )}
          </div>
          <button type="submit" className="btn-submit-login-template btn-login">
            Sign up
          </button>
        </form>
      </div>
      <div className="text-center my-2">or</div>
      <div className="text-center">
        <Link to="/login">Already have an Atlassian account? Log in</Link>
      </div>
    </div>
  );
}

export default Register;
