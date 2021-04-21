import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: `http://localhost:9070`
    baseURL: `https://wtfss-dashboard.herokuapp.com`
  })
}
