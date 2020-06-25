import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { changeHandler, login } from "../../redux/actions/auth";

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  changeHandler,
  login,
};

class LoginPage extends React.Component {
  componentDidUpdate() {
    const { isDone, status } = this.props.auth;

    if (isDone && status) {
      Swal.fire("Success", "Login Success", "success").then(() => {
        this.props.history.push("/dashboard/catalog");
      });
    } else if (isDone && status === false) {
      Swal.fire("Error", this.props.auth.msg, "error");
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { raw_email: email, raw_password: password } = this.props.auth;

    if (!email || !password) {
      Swal.fire("Error", "Email and password must be required", "error");
      return;
    }

    this.props.login({ email, password });
  };

  render() {
    return (
      <>
        <h4 className="mb-3 font-weight-bold">Login</h4>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label className="label-control">Email</label>
            <input
              className="form-control"
              type="email"
              value={this.props.auth.email}
              onChange={(e) =>
                this.props.changeHandler("email", e.target.value)
              }
              id="email"
              placeholder="Your Email"
              disabled={!this.props.auth.isDone}
            />
          </div>
          <div className="form-group">
            <label className="label-control">Password</label>
            <input
              className="form-control"
              type="password"
              value={this.props.auth.password}
              onChange={(e) =>
                this.props.changeHandler("password", e.target.value)
              }
              id="password"
              placeholder="Your Password"
              autoComplete={"true"}
              disabled={!this.props.auth.isDone}
            />
          </div>
          <div className="d-flex flex-column align-items-center mt-4">
            <button
              type="submit"
              className="btn px-4 rounded-pill cta border-0 align-self-stretch text-white"
              disabled={!this.props.auth.isDone}
            >
              {this.props.auth.isDone ? (
                "Login"
              ) : (
                <div className="spinner-border text-light" role="status">
                  <div className="sr-only">Loading...</div>
                </div>
              )}
            </button>
            <small className="mt-3">
              Not have an account?{" "}
              <Link disabled={this.props.auth.isDone} to="/auth/register">
                Register
              </Link>
            </small>
          </div>
        </form>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
