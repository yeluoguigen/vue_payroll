import axios from 'axios'
import config from '../../config'
export default {
  request(method, uri,params=null, data = null, headers = null) {
    if (!method) {
      // console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      // console.error('API function call requires uri argument')
      return
    }
    // {
    //   withCredentials: true
    // }

    var url = config.serverURI + uri
    return axios({
      method,
      url,
      params,
      data,
      headers
    })
  }
}
