import Vue from "vue";
import axios from "axios";

let token;
let user;

let item = localStorage.getItem("user");

user = item ? JSON.parse(item) : null;
token = user ? user.data.token : null;

axios.defaults.baseURL = 'http://clubapi.specstechafrica.com/api'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Authorization"] = `Bearer ${token ? token : ""}`;

const axiosIns = axios.create({
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
