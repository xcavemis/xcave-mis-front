import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

Vue.use(Vuex)

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASEURL,
});

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    hasHoursAvaliable: null,
    endTime: null,
    loadingShow: false,
  },
  mutations: {
    authUser(state, { token, user, hasHoursAvaliable, endTime }) {
      state.token = token;
      state.user = user;
      state.hasHoursAvaliable = hasHoursAvaliable;
      state.endTime = endTime;
    },
    clearAuthData(state) {
      state.token = null;
      state.user = null;
      state.hasHoursAvaliable = null;
      state.endTime = null;
    },
    loadingShow(state, bool) {
      state.loadingShow = bool;
    },
  },
  actions: {
    async login({ commit }, authData) {
      const uri = "/auth/login";

      try {
        const res = await api.post(uri, authData);
        const {
          user,
          access_token: token,
          hasHoursAvaliable,
          endTime,
        } = res.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("hasHoursAvaliable", hasHoursAvaliable);
        localStorage.setItem("endTime", endTime);

        commit("authUser", {
          token,
          user,
          hasHoursAvaliable,
          endTime,
        });
        return {
          user, endTime
        }
      } catch (error) {
        // console.log(error?.response);
        return {
          error: error?.response
        }
      }
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("hasHoursAvaliable");
      localStorage.removeItem("endTime");

      router.replace("/");
    },
    loading({ commit }, bool) {
      commit("loadingShow", bool);
      
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (!token || !userStr) {
        return;
      }
      const hasHoursAvaliable = localStorage.getItem("hasHoursAvaliable");
      const endTime = localStorage.getItem("endTime");

      const user = JSON.parse(userStr);

      commit("authUser", {
        token,
        user,
        hasHoursAvaliable,
        endTime,
      });

      return {
        user,
        endTime
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== null;
    },
    hasTime(state) {
      const hasHoursAvaliable = state?.endTime;
      const endTime = state?.endTime;
      const currentTime = Date.now();

      if (hasHoursAvaliable && endTime) {
        return endTime <= currentTime;
      } else {
        return false;
      }
    },
    user(state) {
      return state.user;
    },
    authorizationHeader(state) {
      return state.token ? { Authorization: `Bearer ${state.token}` } : null;
    },
    loadingShow(state) {
      return state.loadingShow;
    },
  },
  modules: {},
})
