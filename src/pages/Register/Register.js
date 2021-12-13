import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { actRegister } from "./modules/actions";

function Register(props) {
  const [state, setState] = useState({
    values: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    errors: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },

    emailValid: false,
    passwordValid: false,
    nameValid: false,
    phoneNumberValid: false,
    formValid: false, //form chua hop le
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.registerReducer.loading);

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
    let { emailValid, passwordValid, nameValid, phoneNumberValid } = state;

    switch (name) {
      case "email":
        emailValid = mess === "" ? true : false;
        if (value && !value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
          mess = " Email chưa đúng định dạng";
          emailValid = false;
        }
        break;
      case "passWord":
        passwordValid = mess === "" ? true : false;
        if (value.length <= 5 || value.length > 24) {
          mess = "độ dài password phải từ 6 đến 24";
          passwordValid = false;
        }
        break;

      case "name":
        nameValid = mess === "" ? true : false;
        if (value.length <= 3 || value.length > 10) {
          mess = "độ dài name phải từ 3 đến 10";
          nameValid = false;
        }
        break;
      case "phoneNumber":
        phoneNumberValid = mess === "" ? true : false;
        if (value && !value.match(/^\d{10}$/)) {
          mess = "Phone number chưa đúng định dạng";
          phoneNumberValid = false;
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
      nameValid,
      phoneNumberValid,
      formValid: emailValid && passwordValid && nameValid && phoneNumberValid,
    });

    console.log(state);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(actRegister(state.values, props.history));
  };
  if (loading) return <Loader />;
  return (
    <div className="container" style={{ height: window.innerHeight }}>
      <form onSubmit={handleRegister}>
        <h3 className="d-flex justify-content-center">Register</h3>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-control"
            name="email"
            type="text"
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
          <label>Password:</label>
          <input
            className="form-control"
            name="passWord"
            type="text"
            onBlur={handleErors}
            onChange={handleOnchange}
          />
          {state.errors.passWord ? (
            <div className="alert alert-danger">{state.errors.passWord}</div>
          ) : (
            " "
          )}
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control"
            name="name"
            type="text"
            onBlur={handleErors}
            onChange={handleOnchange}
          />
          {state.errors.name ? (
            <div className="alert alert-danger">{state.errors.name}</div>
          ) : (
            " "
          )}
        </div>
        <div className="form-group">
          <label>Phone number:</label>
          <input
            className="form-control"
            name="phoneNumber"
            type="text"
            onBlur={handleErors}
            onChange={handleOnchange}
          />
          {state.errors.phoneNumber ? (
            <div className="alert alert-danger">{state.errors.phoneNumber}</div>
          ) : (
            " "
          )}
        </div>
        <div className="form-group ">
          <div className="row mt-2 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-danger ml-1"
              disabled={!state.formValid}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
