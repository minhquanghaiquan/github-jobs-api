import * as CONSTANTS from './../constants/index';
import {getData } from './../apis/index';

export const fetchData = () => {
     return {
          type: CONSTANTS.FETCH_DATA
     }
}

export const fetchDataSuccess = (data) => {
     return {
          type: CONSTANTS.FETCH_DATA_SUCCESS,
          data: data
     }
}

export const fetchDataFailed = (err) => {
     return {
          type: CONSTANTS.FETCH_DATA_FAILED,
          err: err
     }
}

export const checkNextPage = (hasNextPage) => {
     return {
          type: CONSTANTS.CHECK_NEXT_PAGE,
          hasNextPage
     }
}

export const fetchDataRequest = (params, page) => {
     return (dispatch) => {

          dispatch(fetchData);

          getData(params, page).then(res => {
               dispatch(fetchDataSuccess(res))
          }).catch (err => {
               dispatch(fetchDataFailed(err))
          })

        

          getData({...params , page: page+1}).then(res => {
               dispatch(checkNextPage(res.length !== 0))
          }).catch (err => {
               dispatch(fetchDataFailed(err))
          })
     }
}

// export const checkNextPage = (params) => {
//      return (dispatch) => {
//           getData(params).then(res => {
//                dispatch(nextPage(res.data.length !== 0 ))
//           }).catch (err => {
//               console.log('err')
//           })
//      }
// }