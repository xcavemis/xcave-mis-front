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
    assets: {},
    xr_registered: false,
    warningShow: { show: false, text: '' },
    navigationStatus: { 
      codices: 'pending',
      civil: 'pending',
      mixed: 'pending',
      sensorial: 'pending',
      militar: 'pending',
      monalisa: 'pending',
    },
    visitedScenes: { 
      codices: { arr: [], len: 3 },
      civil: { arr: [], len: 5 },
      mixed: { arr: [], len: 16 },
      sensorial: { arr: [], len: 8 },
      militar: { arr: [], len: 5 },
      monalisa: { arr: [], len: 13 },
    },
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
    xr_registered(state, bool) {
      state.xr_registered = bool;
    },
    assets(state, obj) {
      state.assets = obj;
    },
    warningShow(state, obj) {
      state.warningShow = obj;
    },
    navigationStatus(state, obj) {
      state.navigationStatus[obj.room] = obj.status;
    },
    visitedScenes(state, obj) {
      state.visitedScenes[obj.room].arr = obj.arr;
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
          response: {
            status: res.status,
            user, 
            endTime
          }
        }
      } catch (error) {
        // console.log(error?.response);
        return {
          response: error?.response
        }
      }
    },
    async create({ commit }, authData) {
      const uri = "/users";

      try {
        const res = await api.post(uri, authData);
        const {
          user,
          access_token: token,
          hasHoursAvaliable,
          endTime,
        } = res.data;

        console.log('create user:', res)

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
          response: {
            user, 
            endTime, 
            status: res.status,
          }
        }
      } catch (error) {
        // console.log(error?.response);
        return {
          response: error?.response
        }
      }
    },
    async checkIn({ commit }, ticketData) {
      const uri = "/checkins/ticketNumber";

      try {
        const res = await api.post(uri, ticketData);
        const {
          group,
          access_token: token,
          user,
          hasHoursAvaliable,
          endTime,
        } = res.data;

        console.log('checkIn user:', res)

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
          response: {
            user, 
            endTime, 
            group, 
            hasHoursAvaliable, 
            status: res.status,
          }
        }
      } catch (error) {
        // console.log(error?.response);
        return {
          response: error?.response
        }
      }
    },
    async tokenCheck({ commit, dispatch, state }) {
      const uri = "/auth/check";
      try {
        const res = await api.get(uri, { 
          headers: { Authorization: `Bearer ${state.token}` } 
        });
        const {
          user,
          access_token: token,
          hasHoursAvaliable,
          endTime,
        } = res.data;
        if (user && user != undefined) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
          localStorage.setItem("hasHoursAvaliable", hasHoursAvaliable);
          localStorage.setItem("endTime", endTime);
          console.log('tokenCheck user', user)
          commit("authUser", {
            token,
            user,
            hasHoursAvaliable,
            endTime,
          });
        }

        return {
          endTime,
          status: res.status,
        }
      } catch (error) {
        dispatch('logout')
        return {
          response: error?.response
        }
      }
    },
    autoLogin({ commit, dispatch }) {
      const token = localStorage.getItem("token")??null;
      const userStr = localStorage.getItem("user")??null;
      if (!token || !userStr) {
        return;
      }
      try {
        const hasHoursAvaliable = localStorage.getItem("hasHoursAvaliable");
        const endTime = localStorage.getItem("endTime");
        
        const user = JSON.parse(userStr);
        console.log('autoLogin user', user)
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
      } catch (error) {
        dispatch('logout')
        return {
          response: error?.response
        }
      }
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("hasHoursAvaliable");
      localStorage.removeItem("endTime");
    },
    loading({ commit }, bool) {
      commit("loadingShow", bool);
      
    },
    xr_registered({ commit }, bool) {
      commit("xr_registered", bool);
    },
    assets({ commit }, obj) {
      commit("assets", obj);
    },
    warning({ commit }, obj) {
      commit("warningShow", obj);
    },
    navigation_status({ commit }, obj) {
      commit("navigationStatus", obj);
    },
    visited_scenes({ commit }, obj) {
      commit("visitedScenes", obj);
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
    warningShow(state) {
      return state.warningShow;
    },
    assets(state) {
      return state.assets;
    },
    xr_registered(state) {
      return state.xr_registered;
    },
    navigationStatus(state) {
      return state.navigationStatus;
    },
    visitedScenes(state) {
      return state.visitedScenes;
    },
  },
  modules: {},
})
