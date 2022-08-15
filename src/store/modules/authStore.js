/*eslint-disable*/
import { login, logout, refreshToken } from "@/@apiResources/authApiResources";
// import Vue from "vue";
import axios from "axios";
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
  },
  mutations: {},
  actions: {
    LOGIN({ commit }, payload) {
      setTimeout(() => {
        return new Promise((resolve) => {
          localStorage.setItem("user", JSON.stringify(payload));
          resolve(payload);
        });
      }, 1000);
    },

    // !LOGOUT
    LOGOUT({ commit }) {
      logout()
        .then((resp) => {})
        .catch((err) => {
          console.log(err);
        });
    },
    REFRESH_TOKEN({}) {
      refreshToken()
        .then((resp) => {})
        .catch((err) => {
          console.error(err);
        });
    },
  },
  getters: {},
};
