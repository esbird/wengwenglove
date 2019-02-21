import {
  baseUrl
} from './env'
import axios from 'axios'
export default (url = '', data = {}, type = 'get', headers = {}) => {
  return axios({
    method: type,
    url: baseUrl + "" + url,
    data,
    params: data,
    transformResponse: [
      function (data) {
        // console.log('transformResponse',data)
        // console.log(data)
        if (typeof data == 'string') {
          data = eval("(" + data + ")")
          // console.log('string')
        }
        return data;
      }
    ],
    headers,
  });

}
