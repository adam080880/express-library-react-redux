import React from "react";

import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import MainStore from "./redux/store";

class App extends React.Component {
  render() {
    return (
      <Provider store={MainStore.store}>
        <PersistGate persistor={MainStore.persistor}>
          <Router>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/dashboard" component={Dashboard} />
              <Route>{<Redirect to="/dashboard/catalog" />}</Route>
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
