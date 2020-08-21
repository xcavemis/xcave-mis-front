import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";
import createPlugin from 'logrocket-vuex';
// import LogRocket from 'logrocket';


// const logrocketPlugin = createPlugin(LogRocket);

Vue.use(Vuex)

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASEURL,
});

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    webinarLink: null,
    period: null,
    hasHoursAvaliable: null,
    endTime: null,
    loadingShow: false,
    mute: false,
    assets: {},
    models: {},
    audio_end: false,
    xr_registered: false,
    navigateToPano: '',
    audioTime: 0,
    warningShow: { show: false, text: '' },
    countdown: { show: false, time: '' },
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
    authUser(state, { token, user, hasHoursAvaliable, endTime, webinarLink, period }) {
      state.token = token;
      state.user = user;
      state.webinarLink = webinarLink;
      state.period = period;
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
    mute(state, bool) {
      state.mute = bool;
    },
    xr_registered(state, bool) {
      state.xr_registered = bool;
    },
    assets(state, obj) {
      state.assets = obj;
    },
    audioTime(state, num) {
      state.audioTime = num;
    },
    audio_end(state, bool) {
      state.audio_end = bool;
    },
    models(state, obj) {
      state.models = obj;
    },
    warningShow(state, obj) {
      state.warningShow = obj;
    },
    countdown(state, obj) {
      state.countdown = obj;
    },
    navigateToPano(state, id) {
      state.navigateToPano = id;
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
          period,
          webinarLink
        } = res.data;
        // console.log('Login res', res)

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("hasHoursAvaliable", hasHoursAvaliable);
        localStorage.setItem("endTime", endTime);
        localStorage.setItem("webinarLink", webinarLink);
        localStorage.setItem("period", period);

        // LogRocket.identify(user.id, {
        //   name: user.name,
        //   email: user.email,
        //   checkIns: user.checkIns
        // });

        commit("authUser", {
          token,
          user,
          hasHoursAvaliable,
          endTime,
          webinarLink,
          period
        });
        return {
          response: {
            status: res.status,
            user, 
            endTime
          }
        }
      } catch (error) {
        console.log('error', error);
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

        // console.log('create user:', res)

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
    async checkIn({ commit, state }, ticketData) {
      const uri = "/checkins/ticketNumber";
      // console.log('checkIn', state, ticketData )
      try {
        const res = await api.post(uri, ticketData, {
          headers: {
            'Authorization': `Bearer ${state.token}` 
          }
        });
        // console.log('checkIn', res)
        const {
          group,
          access_token: token,
          user,
          hasHoursAvaliable,
          endTime,
          webinarLink,
          period
        } = res.data;

        // console.log('checkIn user:', res)

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("hasHoursAvaliable", hasHoursAvaliable);
        localStorage.setItem("endTime", endTime);
        localStorage.setItem("webinarLink", webinarLink);
        localStorage.setItem("period", period);

        commit("authUser", {
          token,
          user,
          hasHoursAvaliable,
          endTime,
          webinarLink,
          period
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
        console.log(error);
        return {
          response: error?.response
        }
      }
    },
    async changePass({ commit, state }, passData) {
      const uri = "/auth/password/new";
      // console.log('changePass', passData )
      try {
        const res = await api.post(uri, passData, {
          headers: {
            'Authorization': `Bearer ${state.token}` 
          }
        });
        // console.log('checkIn', res)
        const {
          group,
          access_token: token,
          user,
          hasHoursAvaliable,
          endTime,
          webinarLink,
          period
        } = res.data;

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
        console.log(error);
        return {
          response: error?.response
        }
      }
    },
    async passRecovery({ commit, state }, data) {
      const uri = "/auth/password/recover";
      try {
        const res = await api.post(uri, data);
        // console.log('passRecovery', res)
        return {
          response: res 
        }
      } catch (error) {
        console.log(error);
        return {
          response: error?.response
        }
      }
    },
    async introShow({ commit, state }, userId) {
      const uri = `/users/introShow/${userId}`;
      try {
        const res = await api.put(uri, {
          "introShow": true
        }, {
          headers: {
            'Authorization': `Bearer ${state.token}`
          }
        });
        return {
          response: res 
        }
      } catch (error) {
        console.log(error);
        return {
          response: error?.response
        }
      }
    },
    async verifyTicket({ commit, state }, data) {
      const uri = `/checkins/verify/${data.ticketNumber}/${data.userId}`;
      try {
        const res = await api.get(uri, {
          headers: {
            'Authorization': `Bearer ${state.token}` 
          }
        });
        // console.log('verifyTicket', res)
        return {
          response: res 
        }
      } catch (error) {
        console.log(error);
        return {
          response: error?.response
        }
      }
    },
    async tokenCheck({ commit, state }) {
      const uri = "/auth/check";
      const _token = state.token ? state.token : localStorage.getItem("token")??null
      // const _token = localStorage.getItem("token")
      try {
        const res = await api.get(uri, {
          headers: {'Authorization': 'Bearer '+_token }
        });
        // console.log(res)
        const {
          access_token: token,
          endTime
        } = res.data;
        return {
          endTime,
          status: res.status,
        }
      } catch (error) {
        if (error.response) {
            // console.log(error.response.data);
            // console.log(error.response.status);
            return error.response
        } else if (error.request) {
          // console.log(error.request);
          return error.request
        } else {
          // console.log('Error', error);
          return error
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
        const webinarLink = localStorage.getItem("webinarLink");
        const period = localStorage.getItem("period");
        
        const user = JSON.parse(userStr);
        commit("authUser", {
          token,
          user,
          hasHoursAvaliable,
          endTime,
          webinarLink,
          period
        });
        
        return {
          user,
          hasHoursAvaliable,
          endTime,
          webinarLink,
          period
        }
      } catch (error) {
        // dispatch('logout')
        return {
          response: error
        }
      }
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("hasHoursAvaliable");
      localStorage.removeItem("endTime");
      localStorage.removeItem("webinarLink");
      localStorage.removeItem("period");
    },
    loading({ commit }, bool) {
      commit("loadingShow", bool);
      
    },
    mute({ commit }, bool) {
      commit("mute", bool);
      
    },
    audioTime({ commit }, num) {
      commit("audioTime", num);
    },
    audio_end({ commit }, bool) {
      commit("audio_end", bool);
    },
    xr_registered({ commit }, bool) {
      commit("xr_registered", bool);
    },
    assets({ commit }, obj) {
      commit("assets", obj);
    },
    models({ commit }, obj) {
      commit("models", obj);
    },
    warning({ commit }, obj) {
      commit("warningShow", obj);
    },
    countdown({ commit }, obj) {
      commit("countdown", obj);
    },
    navigateToPano({ commit }, id) {
      commit("navigateToPano", id);
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
    webinarLink(state) {
      return state.webinarLink;
    },
    period(state) {
      return state.period;
    },
    authorizationHeader(state) {
      return state.token ? { Authorization: `Bearer ${state.token}` } : null;
    },
    loadingShow(state) {
      return state.loadingShow;
    },
    mute(state) {
      return state.mute;
    },
    audioTime(state) {
      return state.audioTime;
    },
    audio_end(state) {
      return state.audio_end;
    },
    warningShow(state) {
      return state.warningShow;
    },
    countdown(state) {
      return state.countdown;
    },
    navigateToPano(state) {
      return state.navigateToPano;
    },
    assets(state) {
      return state.assets;
    },
    models(state) {
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
  // plugins: [logrocketPlugin]
})
