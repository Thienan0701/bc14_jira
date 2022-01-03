import React, { useEffect } from "react";
import "./Profile.scss";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import bcryptjs from "bcryptjs";
import api from "../../utils/apiUtils";
import { message } from "antd";
import { actLoginSuccess } from "../Login/modules/actions";
const validateRePass = (value, password) => {
  let error;
  if (value !== password) {
    error = "Passwords do not match";
  }
  return error;
};

export default function Profile(props) {
  const dispatch = useDispatch();

  const { data: infoUserEdit } = useSelector((state) => state.loginReducer);

  useEffect(() => {}, []);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is a required field!";
    } else if (values.name.length > 32 || values.name.length < 8) {
      errors.name = "The name must be between 8 and 32 characters!";
    }

    if (!values.email) {
      errors.email = "Email is a required field!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email is invalid!";
    }

    if (values.phoneNumber !== null) {
      if (!values.phoneNumber) {
        errors.phoneNumber = "Phone number is a required field!";
      } else if (
        !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(
          values.phoneNumber
        )
      ) {
        errors.phoneNumber = "Phone number is invalid!";
      }
    }
    const isAuth = bcryptjs.compareSync(
      values.passwordCurrent,
      localStorage.getItem("WHAT_HAPPEN")
    );
    if (!values.passwordCurrent) {
      errors.passwordCurrent = "Password current is a required field!";
    } else if (!isAuth) {
      errors.passwordCurrent = "Incorrect password!";
    }

    if (!values.password) {
      errors.password = "New password is a required field!";
    } else if (values.password.length > 32 || values.password.length < 8) {
      errors.password = "The password must be between 8 and 32 characters!";
    }

    errors.reTypeNewPass = validateRePass(
      values.reTypeNewPass,
      values.password
    );
    !errors.reTypeNewPass && delete errors.reTypeNewPass;
    return errors;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: infoUserEdit.name,
      phoneNumber: infoUserEdit.phoneNumber,
      email: infoUserEdit.email,
      passwordCurrent: "",
      password: "",
      reTypeNewPass: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      api
        .put("Users/editUser", {
          id: infoUserEdit.id,
          password: values.password,
          emaiL: values.email,
          name: values.name,
          phoneNumber: values.phoneNumber,
        })
        .then((result) => {
          const salt = bcryptjs.genSaltSync(10);
          const hashPassword = bcryptjs.hashSync(values.password, salt);
          localStorage.setItem("WHAT_HAPPEN", hashPassword);
          const info = {
            ...infoUserEdit,
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            avatar: `https://ui-avatars.com/api/?name=${values.name}`,
          };
          dispatch(actLoginSuccess(info));
          message.success("Update success!");
          formik.resetForm();
        })
        .catch((error) => {
          formik.resetForm();
          message.error(error.response?.data.content, 2.5);
        });
    },
  });

  return (
    <div className="profile">
      <div className="container">
        <div className=" text-center title">Profile</div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  className="input-global"
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-danger">{formik.errors.name}</p>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input-global"
                  value={formik.values.phoneNumber}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <p className="text-danger">{formik.errors.phoneNumber}</p>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="input-global"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-danger">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="passwordCurrent">Password Current</label>
                <input
                  id="passwordCurrent"
                  name="passwordCurrent"
                  type="password"
                  className="input-global"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordCurrent}
                />{" "}
                {formik.touched.passwordCurrent &&
                formik.errors.passwordCurrent ? (
                  <p className="text-danger">{formik.errors.passwordCurrent}</p>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  id="password"
                  name="password"
                  onBlur={formik.handleBlur}
                  type="password"
                  className="input-global"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-danger">{formik.errors.password}</p>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="reTypeNewPass">Re-type New Password</label>
                <input
                  id="reTypeNewPass"
                  name="reTypeNewPass"
                  type="password"
                  onBlur={formik.handleBlur}
                  className="input-global"
                  onChange={formik.handleChange}
                  value={formik.values.reTypeNewPass}
                />
                {formik.touched.reTypeNewPass && formik.errors.reTypeNewPass ? (
                  <p className="text-danger">{formik.errors.reTypeNewPass}</p>
                ) : null}
              </div>
              <div className="text-right">
                <button type="submit" className="btn-global btn-global-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
