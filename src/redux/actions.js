import * as CONSTANTS from "./../constants/index";
import { getData } from "./../apis/index";

export const fetchData = () => {
  return {
    type: CONSTANTS.FETCH_DATA,
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: CONSTANTS.FETCH_DATA_SUCCESS,
    data: data,
  };
};

export const fetchDataFailed = (err) => {
  return {
    type: CONSTANTS.FETCH_DATA_FAILED,
    err: err,
  };
};

export const checkNextPage = (hasNextPage) => {
  return {
    type: CONSTANTS.CHECK_NEXT_PAGE,
    hasNextPage,
  };
};

export const fetchDataRequest = (params, page, cancelToken1, cancelToken2) => {
  return (dispatch) => {
    dispatch(fetchData());

     getData(params, page, cancelToken1)
      .then((res) => {
        dispatch(fetchDataSuccess(res));
      })
      .catch((err) => {
        dispatch(fetchDataFailed(err));
      });

     getData(params, page + 1, cancelToken2)
      .then((res) => {
        dispatch(checkNextPage(res.length !== 0));
      })
      .catch((err) => {
        dispatch(fetchDataFailed(err));
      });
  };
};