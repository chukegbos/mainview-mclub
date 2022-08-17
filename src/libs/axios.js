import Vue from "vue";

// axios
import axios from "axios";

let token;
let x = localStorage.getItem("token");
token = x ? JSON.parse(x) : null;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

axios.defaults.headers.common["Authorization"] = `Bearer ${
  token ? token.tok : ""
}`;

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  //baseURL:"http://127.0.0.1:8000/api" || process.env.VUE_APP_ROOT_API,
  baseURL:"https://club247-api.herokuapp.com/api" || process.env.VUE_APP_ROOT_API,
  withCredentials: false, // Check cross-site Access-Control
  // timeout: 1000,
});

axiosIns.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosIns.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error);

    return Promise.reject(error);
    // }
    // return;
  }
);

Vue.prototype.$http = axiosIns;
window.apiWorker = axiosIns;

export default axiosIns;
