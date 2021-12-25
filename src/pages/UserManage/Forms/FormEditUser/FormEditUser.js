import React, { useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";

import { withFormik } from "formik";
import * as yup from "yup";

import {
  actCloseDrawerCommon,
  setCallbackClose,
  setCallbackFocus,
} from "../../../../components/DrawerCommon/modules/actions";
import Swal from "sweetalert2";
import { actUpdateUser, createUser } from "../../modules/actions";

function FormEditUser(props) {
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
          <label htmlFor="id">ID:</label>
          <input
            className="form-control"
            id="id"
            name="id"
            placeholder="Name"
            value={values.id}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            className="form-control"
            name="name"
            id="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? (
            <div className="alert alert-danger">{errors.name}</div>
          ) : (
            " "
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone-number">Phone number:</label>
          <input
            className="form-control"
            name="phoneNumber"
            id="phone-number"
            placeholder="Phone number"
            value={values.phoneNumber}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.phoneNumber && errors.phoneNumber ? (
            <div className="alert alert-danger">{errors.phoneNumber}</div>
          ) : (
            " "
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className="form-control"
            name="email"
            id="email"
            placeholder="Email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.email && errors.email ? (
            <div className="alert alert-danger">{errors.email}</div>
          ) : (
            " "
          )}
        </div>

        <div className="form-group">
          <label htmlFor="passWord">Password:</label>
          <input
            type="password"
            className="form-control"
            name="passWord"
            id="passWord"
            placeholder="Password"
            value={values.passWord}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.passWord && errors.passWord ? (
            <div className="alert alert-danger">{errors.passWord}</div>
          ) : (
            " "
          )}
        </div>

        <div className="form-group text-right">
          <button
            onClick={handleClose}
            className="btn btn-secondary mr-1"
            type="button"
          >
            Cancel
          </button>
          <button ref={btnSubmitRef} className="btn btn-primary" type="submit">
            Update
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
    .required("Name is a required field!")
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
    .min(8, "Password must be at least 8 characters!")
    .max(32, "Password must be less than 32 characters!"),
});

const MyEnhancedForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      name: props.userEdit.name,
      phoneNumber: props.userEdit.phoneNumber,
      email: props.userEdit.email,
      passWord: "",
      id: props.userEdit.userId,
    };
  },
  validationSchema: schema,

  handleSubmit: (values, props) => {
    props.props.drawerCommonReducer.callbackFocus();
    props.props.dispatch(actUpdateUser(values, Swal));
  },

  displayName: "BasicForm",
})(FormEditUser);

const mapStateToProps = (state, ownProps) => {
  return {
    userEdit: state.usermanageReducer.userEdit,
    drawerCommonReducer: state.drawerCommonReducer,
  };
};

export default connect(mapStateToProps)(MyEnhancedForm);
