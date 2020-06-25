import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "./authPages/LoginPage";
import RegisterPage from "./authPages/RegisterPage";

import { connect } from "react-redux";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.auth.session).length > 0) {
      this.props.history.push("/dashboard/catalog");
    }
  }

  login = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="card d-flex flex-row align-items-center justify-content-center auth-box bg-white shadow-sm p-3 border-0 rounded-0">
          <div className="card-body">
            <Switch>
              <Route exact path="/auth/login" component={LoginPage} />
              <Route exact path="/auth/register" component={RegisterPage} />
              <Route>{<Redirect to="/auth/login" />}</Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Auth);
