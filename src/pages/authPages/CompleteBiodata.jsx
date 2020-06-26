import React from "react";

import { ModalBody } from "reactstrap";
import { connect } from "react-redux";

import { toggleModal } from "../../redux/actions/controllerPage";
import { completeRegistration, logout } from "../../redux/actions/auth";
import Swal from "sweetalert2";

class CompleteBiodata extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      birth: "",
      phone: "",
      gender: "",
    };
  }

  completeRegis = (e) => {
    e.preventDefault();

    const { name, birth, phone, gender } = this.state;

    this.props.completeRegistration(
      { name, birth, phone, gender },
      this.props.auth.session.token
    );
  };

  componentDidUpdate() {
    if (this.props.auth.completeRegis && this.props.auth.isDone) {
      Swal.fire("Success", "Success complete regis", "success").then(() => {
        this.props.logout();
        this.props.toggleModal();
        this.props.history.push("/auth/login");
      });
    } else if (
      this.props.auth.completeRegis === false &&
      this.props.auth.isDone
    ) {
      Swal.fire("Error", this.props.auth.msg, "error");
    }
  }

  render() {
    return (
      <>
        <form method="post" onSubmit={this.completeRegis}>
          <ModalBody>
            <h3 className="font-weight-bold mb-4">Complete Biodata</h3>
            <div className="form-group">
              <label htmlFor="name" className="label-control">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="name"
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birth" className="label-control">
                birth
              </label>
              <input
                type="date"
                name="birth"
                id="birth"
                className="form-control"
                onChange={(e) => {
                  this.setState({ birth: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="label-control">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                onChange={(e) => {
                  this.setState({ phone: e.target.value });
                }}
                className="form-control"
                placeholder="phone"
              />
            </div>
            <div
              className="form-group ml-0 pl-0"
              onChange={(e) => {
                this.setState({ gender: e.target.value });
              }}
            >
              <label htmlFor="">Gender</label> <br />
              <div className="custom-control custom-radio custom-control-inline ml-0">
                <input
                  type="radio"
                  value="m"
                  name="gender"
                  className="custom-control-input"
                  id="l"
                />
                <label htmlFor="l" className="custom-control-label">
                  Man
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  value="f"
                  name="gender"
                  className="custom-control-input"
                  id="p"
                />
                <label htmlFor="p" className="custom-control-label">
                  Woman
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 cta rounded-pill px-3 text-white border-0 py-2"
            >
              Submit
            </button>
            <button
              className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3"
              type="button"
              onClick={(e) => this.props.toggleModal()}
            >
              Close
            </button>
          </ModalBody>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  controllerPage: state.controllerPage,
  auth: state.auth,
});

const mapDispatchToProps = {
  toggleModal,
  completeRegistration,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompleteBiodata);
