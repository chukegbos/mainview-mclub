import Vue from "vue";
import Vuex from "vuex";
// Modules
import app from "./modules/app";
import appConfig from "./modules/app-config";
import verticalMenu from "./modules/vertical-menu";

import Auth from "./modules/authStore";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    Auth,
  },
  strict: process.env.DEV,
});
