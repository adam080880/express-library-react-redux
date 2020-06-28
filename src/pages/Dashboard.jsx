import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Modal } from "reactstrap";

import { logout } from "../redux/actions/auth";
import { toggleModal } from "../redux/actions/controllerPage";

import Catalog from "./dashboardPages/Catalog";
import Detail from "./dashboardPages/Detail";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import AddBookModal from "./dashboardModals/AddBookModal";
import CompleteBiodata from "./authPages/CompleteBiodata";
import Transaction from "./dashboardPages/Transaction";
import Config from "./dashboardPages/Config";
import User from "./dashboardPages/User";

class Dashboard extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <>
        <Modal
          isOpen={this.props.controllerPage.isOpen}
          toggle={this.props.toggleModal}
        >
          {this.props.toggleModal &&
            this.props.controllerPage.modalInDashboard === "add_book" && (
              <AddBookModal
                history={this.props.history}
                location={this.props.location}
              />
            )}
          {this.props.toggleModal &&
            this.props.controllerPage.modalInDashboard ===
              "complete_biodata" && (
              <CompleteBiodata
                history={this.props.history}
                location={this.props.location}
              />
            )}
        </Modal>
        <div className="row dashboard mx-0 h-100">
          <Sidebar />
          <div className="col px-0">
            <div className="sticky-top">
              <Navbar />
            </div>

            <Route exact path="/dashboard/history" component={Transaction} />
            <Route exact path="/dashboard/catalog" component={Catalog} />
            <Route exact path="/dashboard/configs" component={Config} />
            <Route exact path="/dashboard/users" component={User} />
            <Route
              exact
              path="/dashboard/catalog/detail/:id"
              component={Detail}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  controllerPage: state.controllerPage,
});

const mapDispatchToProps = {
  toggleModal,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
