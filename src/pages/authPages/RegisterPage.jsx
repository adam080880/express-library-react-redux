import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { changeHandler, register } from "../../redux/actions/auth";

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  changeHandler,
  register,
};

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordConfirm: "",
    };
  }

  componentDidUpdate() {
    const { isDone, status } = this.props.auth;

    if (isDone && status) {
      Swal.fire("Success", "Register Success", "success").then(() => {
        this.props.history.push("/auth/login");
      });
    } else if (isDone && status === false) {
      Swal.fire("Error", this.props.auth.msg, "error");
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { raw_email: email, raw_password: password } = this.props.auth;

    if (!email || !password) {
      Swal.fire(
        "Error",
        "Email, password and confirm password must be required",
        "error"
      );
      return;
    }

    if (this.state.passwordConfirm !== password) {
      Swal.fire("Error", "Password is not match", "error");
      return;
    }

    this.props.register({ email, password });
  };

  render() {
    return (
      <>
        <h4 className="mb-3 font-weight-bold">Register</h4>
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
          <div className="form-group">
            <label className="label-control">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={this.state.passwordConfirm}
              onChange={(e) =>
                this.setState({ passwordConfirm: e.target.value })
              }
              id="passwordConfirm"
              placeholder="Your Confirm Password"
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
                "Register"
              ) : (
                <div className="spinner-border text-light" role="status">
                  <div className="sr-only">Loading...</div>
                </div>
              )}
            </button>
            <small className="mt-3">
              Not have an account?{" "}
              <Link disabled={this.props.auth.isDone} to="/auth/login">
                Login
              </Link>
            </small>
          </div>
        </form>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
