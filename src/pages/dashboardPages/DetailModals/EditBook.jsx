import React from "react";
import { ModalBody } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import Swal from "sweetalert2";

import { editBook, setStatus } from "../../../redux/actions/books";
import { getAuthor } from "../../../redux/actions/author";
import { getGenre } from "../../../redux/actions/genre";
import { toggleModal } from "../../../redux/actions/controllerPage";

class EditBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book_id: this.props.match.params.id,
      title: this.props.books.data.title,
      description: this.props.books.data.description,
      genre_id: this.props.books.data.genre_id,
      author_id: this.props.books.data.author_id,
      image: this.props.books.data.image,
      file: [],
      file_: {},
    };
  }

  handleImage = (e) => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      file_: e.target.files[0],
    });
  };

  updateBook = (e) => {
    e.preventDefault();

    if (this.state.file_.size > 0) {
      if (
        this.state.file_.size >= 1240000 ||
        this.state.file_.type.split("/")[0] !== "image"
      ) {
        Swal.fire(
          "Failed",
          "Max file size is 1240KB and file type just image",
          "error"
        );
        return;
      }
    }

    let formData = new FormData();
    if (this.state.file_.size > 0) {
      formData.append("image", this.state.file_);
    }
    formData.set("title", this.state.title);
    formData.set("description", this.state.description);
    formData.set("author_id", this.state.author_id);
    formData.set("genre_id", this.state.genre_id);

    this.props.editBook(
      formData,
      this.state.book_id,
      this.props.auth.session.token
    );
    this.props.setStatus(null);
    this.props.toggleModal();
  };

  componentDidMount() {
    this.props.getGenre();
    this.props.getAuthor();
  }

  render() {
    return (
      <>
        {(!this.props.genre.status || !this.props.author.status) && (
          <div className="w-100 text-center my-5">
            <div className="spinner-border text-primary">
              <div className="sr-only">loading...</div>
            </div>
          </div>
        )}
        {this.props.genre.status && this.props.author.status && (
          <ModalBody>
            <form onSubmit={this.updateBook} method="post">
              <h3 className="mb-4 font-weight-bold">Edit Book</h3>
              <div className="form-group">
                <label htmlFor="title" className="label-control">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-control"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  placeholder="title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="label-control">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  placeholder="description"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="genre" className="label-control">
                  Genre
                </label>
                <Select
                  onChange={(value) => this.setState({ genre_id: value.value })}
                  defaultValue={{
                    label: this.props.genre.items.filter(
                      (val) => val.id === this.state.genre_id
                    )[0].name,
                    value: this.state.genre_id,
                  }}
                  className="flex-grow-1"
                  placeholder="Choose a genre"
                  options={this.props.genre.items.map((val) => ({
                    value: val.id,
                    label: val.name,
                  }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="author" className="label-control">
                  Author
                </label>
                <Select
                  onChange={(value) =>
                    this.setState({ author_id: value.value })
                  }
                  className="flex-grow-1"
                  defaultValue={{
                    label: this.props.author.items.filter(
                      (val) => val.id === this.state.author_id
                    )[0].name,
                    value: this.state.author_id,
                  }}
                  placeholder="Choose a author"
                  options={this.props.author.items.map((val) => {
                    return { value: val.id, label: val.name };
                  })}
                />
              </div>
              <div className="form-group w-100 d-flex justify-content-center">
                {(this.state.file.length > 0 ||
                  this.props.books.data.image) && (
                  <img
                    src={
                      this.state.file.length > 0
                        ? this.state.file
                        : this.props.books.data.image
                    }
                    alt="Preview"
                    width="200px"
                    className="m-auto"
                  />
                )}
              </div>
              <div className="form-group">
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  id="file"
                  onChange={this.handleImage}
                />
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
                onClick={this.props.toggleModal}
              >
                Close
              </button>
            </form>
          </ModalBody>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books,
  genre: state.genre,
  author: state.author,
  auth: state.auth,
});

const mapDispatchToProps = {
  getGenre,
  getAuthor,
  editBook,
  toggleModal,
  setStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);
