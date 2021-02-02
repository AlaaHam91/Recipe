import promise from "promise";
import api from "@/services/api/auth/auth.api";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null
  },

  getters: {
    isSignedIn(state) {
      return state.token !== null;
    }
  },

  mutations: {
    signin(state, data) {
      state.token = data.token;
    },
    signout(state) {
      state.token = null;
    }
  },

  actions: {
    // signin({ commit }, credentials) {
    signin() {
      // return new promise((resolve, reject) => {

      //
      const token = "token";
      localStorage.setItem("token", token);
      // //
      // api
      //   .signin(credentials.email, credentials.password)
      //   .then(res => {
      //     commit("signin", res.data.message);
      //     resolve();
      //   })
      //   .catch(err => {
      //     reject(err);
      //   });
      // });
    },
    signout({ getters, commit }) {
      //
      localStorage.removeItem("token");
      //
      if (getters.isSignedIn) {
        return new promise((resolve, reject) => {
          api
            .signout()
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject();
            })
            .finally(() => {
              commit("signout");
            });
        });
      }
    }
  }
};
