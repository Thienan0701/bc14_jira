import React from "react";

function Login() {
  return (
    <div className="container">
      <h3 className="d-flex justify-content-center">Login</h3>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" name="taiKhoan" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="text" className="form-control" name="matKhau" />
        </div>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
