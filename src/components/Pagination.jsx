import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getBook } from "../redux/actions/books";
import qs from "querystring";

const mapStateToProps = (state) => ({
  books: state.books,
});

const mapDispatchToProps = {
  getBook,
};

const handlePrev = (props, params, history) => {
  params = { ...params, page: parseInt(props.books.pageInfo.page) - 1 };
  props.getBook(params);
  history.push(`/dashboard/catalog?${qs.stringify(params)}`);
};

const handlePage = (props, params, history, i) => {
  i += 1;
  params = { ...params, ...{ page: i } };
  history.push(`/dashboard/catalog?${qs.stringify(params)}`);
  props.getBook(params);
};

const handleNext = (props, params, history) => {
  params = { ...params, ...{ page: parseInt(props.books.pageInfo.page) + 1 } };
  props.getBook(params);
  history.push(`/dashboard/catalog?${qs.stringify(params)}`);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  const location = useLocation();
  const history = useHistory();
  const params = qs.parse(location.search.slice(1));
  params.page = parseInt(params.page) || 1;
  return (
    <div className="d-flex flex-row align-items-center justify-content-between w-100 px-4">
      <div className="btn-wrapper">
        <button
          className="d-inline-flex btn btn-outline-secondary"
          disabled={props.books.pageInfo.page === 1}
          onClick={(e) => handlePrev(props, params, history)}
        >
          Prev
        </button>
      </div>
      <div className="wrapper">
        {!props.books.isLoading &&
          [...Array(props.books.pageInfo.totalPage)].map((o, i) => (
            <button
              onClick={() => handlePage(props, params, history, i)}
              className={`mx-1 btn ${
                params.page === i + 1
                  ? "btn-secondary"
                  : "btn-outline-secondary"
              }`}
              key={i.toString()}
            >
              {i + 1}
            </button>
          ))}
      </div>
      <div className="btn-wrapper">
        <button
          className="d-inline-flex btn btn-outline-secondary"
          disabled={
            params.page >= props.books.pageInfo.totalPage ? true : false
          }
          onClick={() => handleNext(props, params, history)}
        >
          Next
        </button>
      </div>
    </div>
  );
});
