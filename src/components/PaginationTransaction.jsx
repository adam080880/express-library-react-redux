import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { getMember, getAdmin } from "../redux/actions/transaction";
import qs from "querystring";

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});

const mapDispatchToProps = {
  getMember,
  getAdmin,
};

const handlePrev = (props, params, history) => {
  params = { ...params, page: parseInt(props.transaction.pageInfo.page) - 1 };
  if (props.role === "member") {
    props.getMember(params, props.token);
  } else {
    props.getAdmin(params, props.token);
  }
  history.push(`/dashboard/history?${qs.stringify(params)}`);
};

const handlePage = (props, params, history, i) => {
  i += 1;
  params = { ...params, ...{ page: i } };
  history.push(`/dashboard/history?${qs.stringify(params)}`);
  if (props.role === "member") {
    props.getMember(params, props.token);
  } else {
    props.getAdmin(params, props.token);
  }
};

const handleNext = (props, params, history) => {
  params = {
    ...params,
    ...{ page: parseInt(props.transaction.pageInfo.page) + 1 },
  };
  if (props.role === "member") {
    props.getMember(params, props.token);
  } else {
    props.getAdmin(params, props.token);
  }
  history.push(`/dashboard/history?${qs.stringify(params)}`);
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
          disabled={props.transaction.pageInfo.page === 1}
          onClick={(e) => handlePrev(props, params, history)}
        >
          Prev
        </button>
      </div>
      <div className="wrapper">
        {!props.transaction.isLoading &&
          [...Array(props.transaction.pageInfo.totalPage)].map((o, i) => (
            <button
              onClick={() => handlePage(props, params, history, i)}
              className={`mx-1 btn ${
                params.page === i + 1
                  ? "btn-secondary"
                  : "btn-outline-secondary"
              }`}
              disabled={params.page === i + 1}
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
            params.page >= props.transaction.pageInfo.totalPage ? true : false
          }
          onClick={() => handleNext(props, params, history)}
        >
          Next
        </button>
      </div>
    </div>
  );
});
