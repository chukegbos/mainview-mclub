/*eslint-disable*/
import { login, logout, refreshToken } from "@/@apiResources/authApiResources";
// import Vue from "vue";
import axios from "axios";
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
    isAuthenticated: false,
  },
  mutations: {
    mIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
  },
  actions: {
    LOGIN({ commit }, payload) {
     
      commit("mIsAuthenticated", true);
        return new Promise((resolve, reject) => {
          login(payload).then(res =>{
            if(res.data){
              localStorage.setItem("user", JSON.stringify(res.data));
              resolve(res)
            }
            
          })
          .catch(err=>{
            reject(err);
          });
         
        });
    },

    // !LOGOUT
    LOGOUT({ commit }) {
      logout()
        .then((resp) => {
          
        })
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
  getters: {
    authenticationStatus(state) {
      return state.isAuthenticated;
    },
  },
};
