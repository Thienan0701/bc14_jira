import React, { useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";

import { withFormik } from "formik";
import * as yup from "yup";

import {
  actCloseDrawerCommon,
  setCallbackClose,
  setCallbackFocus,
} from "../../../../components/DrawerCommon/modules/actions";
import { createUser } from "../../modules/actions";
import { message } from "antd";

function FormCreateUser(props) {
  const btnSubmitRef = useRef();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = props;

  const dispatch = useDispatch();
  const handleClose = () => {
    resetForm();
    dispatch(actCloseDrawerCommon());
  };
  useEffect(() => {
    dispatch(setCallbackClose(handleClose));
  }, []);

  useEffect(() => {
    dispatch(setCallbackFocus(() => btnSubmitRef.current.focus()));
  }, [btnSubmitRef]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            className="input-global input-project"
            name="name"
            id="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? (
            <p className="text-danger">{errors.name}</p>
          ) : (
            " "
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone-number">Phone number:</label>
          <input
            className="input-global input-project"
            name="phoneNumber"
            id="phone-number"
            placeholder="Phone number"
            value={values.phoneNumber}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.phoneNumber && errors.phoneNumber ? (
            <p className="text-danger">{errors.phoneNumber}</p>
          ) : (
            " "
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="input-global input-project"
            name="email"
            id="email"
            placeholder="Email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.email && errors.email ? (
            <p className="text-danger">{errors.email}</p>
          ) : (
            " "
          )}
        </div>

        <div className="form-group">
          <label htmlFor="passWord">Password:</label>
          <input
            type="password"
            className="input-global input-project"
            name="passWord"
            id="passWord"
            placeholder="Password"
            value={values.passWord}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.passWord && errors.passWord ? (
            <p className="text-danger">{errors.passWord}</p>
          ) : (
            " "
          )}
        </div>

        <div className="form-group text-right">
          <button
            ref={btnSubmitRef}
            className="btn-global btn-global-primary mr-1"
            type="submit"
          >
            Create
          </button>
          <button
            onClick={handleClose}
            className="btn-global btn-global-secondary "
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

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

const MyEnhancedForm = withFormik({
  mapPropsToValues: (props) => {
    return {
      name: "",
      phoneNumber: "",
      email: "",
      passWord: "",
    };
  },
  validationSchema: schema,

  handleSubmit: (values, props) => {
    props.props.drawerCommonReducer.callbackFocus();
    props.props.dispatch(createUser(values, message));
  },

  displayName: "BasicForm",
})(FormCreateUser);

const mapStateToProps = (state, ownProps) => {
  return {
    drawerCommonReducer: state.drawerCommonReducer,
  };
};

export default connect(mapStateToProps)(MyEnhancedForm);
