import React from "react";
import { ModalBody } from "reactstrap";
import { toggleModal } from "../../../redux/actions/controllerPage";
import {
  booking,
  setStatus,
  onBorrowPage,
} from "../../../redux/actions/transaction";
import { findBook } from "../../../redux/actions/books";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book_id: props.match.params.id,
      promise_returned_at: "",
    };
    this.props.onBorrowPage(null);
  }

  booking = (e) => {
    e.preventDefault();
    this.props.booking(
      {
        book_id: this.state.book_id,
        promise_returned_at: this.state.promise_returned_at,
      },
      this.props.auth.session.token
    );
  };

  componentDidUpdate() {
    if (
      this.props.transaction.isLoading === false &&
      this.props.transaction.status === true
    ) {
      Swal.fire("Success", "Success booking", "success").then(() => {
        this.props.findBook(this.state.book_id);
        this.props.toggleModal();
        this.props.setStatus(null);
      });
    } else if (
      this.props.transaction.isLoading === false &&
      this.props.transaction.status === false
    ) {
      Swal.fire("Error", this.props.transaction.msg, "error").then(() => {
        this.props.setStatus(null);
      });
    }
  }

  render() {
    return (
      <ModalBody>
        <h3 className="mb-4 font-weight-bold">Booking</h3>
        <form method="post" onSubmit={this.booking}>
          <div className="form-group">
            <label htmlFor="promised_returned_at" className="label-control">
              Return date
            </label>
            <input
              className="form-control"
              type="date"
              name="promised_returned_at"
              id="promised_returned_at"
              onChange={(e) =>
                this.setState({ promise_returned_at: e.target.value })
              }
            />
          </div>
          <button
            className="cta rounded-pill mt-3 mb-2 px-3 py-2 border-0 text-white"
            type="submit"
          >
            Book
          </button>
          <button
            className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3"
            type="button"
            onClick={this.props.toggleModal}
          >
            Close
          </button>
        </form>
      </ModalBody>
    );
  }
}

const mapStateToProps = (state) => ({
  controllerPage: state.controllerPage,
  auth: state.auth,
  transaction: state.transaction,
});

const mapDispatchToProps = {
  toggleModal,
  booking,
  findBook,
  setStatus,
  onBorrowPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
