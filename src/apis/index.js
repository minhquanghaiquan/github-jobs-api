import axios from 'axios';

const URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

export const getData = (params, page , cancelToken) => {
     return new Promise ((resolve , reject) => {
          axios.get(URL, {
               cancelToken: cancelToken.token,
               params: { markdown: true, page, ...params}
          })
          .then((res) => {
               resolve(res.data);
          })
          .catch(err => {
               reject(err)
          })
     } )
}