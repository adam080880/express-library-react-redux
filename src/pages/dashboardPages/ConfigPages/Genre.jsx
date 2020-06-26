import React from "react";
import { connect } from "react-redux";
import {
  search,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../../../redux/actions/genre";

import { Modal, ModalBody } from "reactstrap";
import Swal from "sweetalert2";

const mapStateToProps = (state) => ({
  genre: state.genre,
  auth: state.auth,
});

const mapDispatchToProps = {
  search,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
};

class Genre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: "",
      isOpen: false,
      genre_id: "",
      genreName: "",
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentDidMount() {
    this.props.getGenre();
  }

  submit = (e) => {
    e.preventDefault();
    this.props.search(this.state.genre, this.props.genre.real);
  };

  addGenre = (e) => {
    e.preventDefault();
    this.props
      .createGenre(
        { name: this.state.genreName },
        this.props.auth.session.token
      )
      .then((res) => {
        Swal.fire("Success", "Success create genre", "success").then(() => {
          this.props.getGenre();
        });
      })
      .catch((rej) => {
        Swal.fire("Error", "Error server", "error");
      })
      .finally(() => {
        this.setState({ isOpen: false, genre_id: "" });
      });
  };

  editGenre = (e) => {
    e.preventDefault();
    this.props
      .updateGenre(
        { name: this.state.genreName },
        this.state.genre_id,
        this.props.auth.session.token
      )
      .then((res) => {
        Swal.fire("Success", "Success update genre", "success").then(() => {
          this.props.getGenre();
        });
      })
      .catch((rej) => {
        Swal.fire("Error", "Error server", "error");
      })
      .finally(() => {
        this.setState({ isOpen: false, genre_id: "" });
      });
  };

  deleteGenre = (id) => {
    Swal.fire({
      title: "Are you sure to delete this genre?",
      text: "You can't recover this data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.value) {
        this.props
          .deleteGenre(id, this.props.auth.session.token)
          .then((res) => {
            Swal.fire("Success", "Success delete genre", "success").then(() => {
              this.props.getGenre();
            });
          })
          .catch((rej) => {
            Swal.fire("Error", "Error server", "error");
          })
          .finally(() => {
            this.setState({ isOpen: false, genre_id: "" });
          });
      }
    });
  };

  render() {
    return (
      <div className="col-sm-6 mt-2">
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalBody>
            <form
              onSubmit={this.state.genre_id ? this.editGenre : this.addGenre}
            >
              <h3 className="mb-3">Manage Genre</h3>
              <div className="form-group">
                <div className="label-control">Name</div>
                <input
                  type="text"
                  defaultValue={this.state.genre_id ? this.state.genreName : ""}
                  onChange={(e) => this.setState({ genreName: e.target.value })}
                  placeholder="Genre name"
                  className="form-control"
                />
              </div>
              <button
                className="cta px-3 py-2 rounded-pill text-white border-0 mt-3"
                type="submit"
              >
                Submit
              </button>
              <button
                className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3"
                type="button"
                onClick={this.toggle}
              >
                Close
              </button>
            </form>
          </ModalBody>
        </Modal>
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <span className="font-weight-bold">Genre Table</span>
              <div className="control d-flex align-items-center">
                <form
                  action=""
                  onSubmit={this.submit}
                  className="d-flex align-items-center"
                >
                  <input
                    type="text"
                    onChange={(e) => this.setState({ genre: e.target.value })}
                    className="form-control"
                    value={this.state.genre}
                    placeholder="Search genres"
                  />
                </form>
                <button
                  className="btn btn-primary btn-sm d-flex align-self-stretch align-items-center justify-content-center ml-2"
                  onClick={(e) => {
                    this.setState({
                      genre_id: "",
                    });
                    this.toggle();
                  }}
                >
                  <span className="fas fa-plus mr-2"></span> Genre
                </button>
              </div>
            </div>

            <div style={{ overflowX: "auto", overflowY: "auto" }}>
              <table className="mt-2 w-100 table mt-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.genre.items.map((val, index) => (
                    <tr key={index}>
                      <td>{val.name}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => this.deleteGenre(val.id)}
                        >
                          <span className="fas fa-trash"></span>
                        </button>
                        <button
                          className="btn btn-warning btn-sm ml-2"
                          onClick={(e) => {
                            this.setState({
                              genreName: val.name,
                              genre_id: val.id,
                            });
                            this.toggle();
                          }}
                        >
                          <span className="fas fa-pen"></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Genre);
