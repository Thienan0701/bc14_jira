import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { actRegister } from "./modules/actions";

function Register(props) {
  const [state, setstate] = useState({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.registerReducer.loading);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setstate({
      ...state,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(actRegister(state, props.history));
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
            onChange={handleOnchange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-control"
            name="passWord"
            type="text"
            onChange={handleOnchange}
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control"
            name="name"
            type="text"
            onChange={handleOnchange}
          />
        </div>
        <div className="form-group">
          <label>Phone number:</label>
          <input
            className="form-control"
            name="phoneNumber"
            type="text"
            onChange={handleOnchange}
          />
        </div>
        <div className="form-group ">
          <div className="row mt-2 d-flex justify-content-center">
            <button type="submit" className="btn btn-danger ml-1">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;