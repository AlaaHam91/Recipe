import { getField, updateField } from "vuex-map-fields";
import api from "@/services/api/recipe/recipe.api";
import promise from "promise";

export default {
  namespaced: true,
  state: {
    id: 0,
    form: {
      name: null,
      description: null,
      image: null
    },
    messages: []
  },

  getters: {
    getField
  },

  mutations: {
    updateField,
    LOADITEM(state, data) {
      state.form = data;
    },
    MESSAGES(state, data) {
      state.messages = data;
    },
    RESET(state) {
      state.id = 0;
      state.form.name = null;
      state.form.description = null;
      state.form.image = null;
    }
  },

  actions: {
    initiateData(state) {
      let data = {
        ...state.form
      };
      return data;
    },
    getRecipes({ commit }, pagination) {
      return new promise((resolve, reject) => {
        api
          .index(pagination)
          .then(res => {
            commit("RECIPES", res);
            resolve(res);
          })
          .catch(err => reject(err));
      });
    },
    getRecipe({ commit, state }) {
      return new promise((resolve, reject) => {
        api
          .show(state.id)
          .then(res => {
            commit("LOADITEM", res);
            resolve(res);
          })
          .catch(err => reject(err));
      });
    },
    save({ state, commit, dispatch }) {
      return new promise(async (resolve, reject) => {
        let data = await dispatch("initiateData");

        if (state.id == 0)
          api
            .create(data)
            .then(() => {
              commit("MESSAGES", { messages: [] });
              resolve();
            })
            .catch(res => {
              commit("MESSAGES", {
                messages: Array.isArray(res.data.message)
                  ? res.data.message
                  : [res.data.message]
              });
              reject();
            });
        else if (state.id > 0)
          api
            .update(state.id, data)
            .then(res => {
              commit("MESSAGES", { messages: [] });
              resolve(res);
            })
            .catch(res => {
              commit("MESSAGES", {
                messages: Array.isArray(res.data.message)
                  ? res.data.message
                  : [res.data.message]
              });
              reject(res);
            });
      });
    },
    delete({ state }) {
      return new promise((resolve, reject) => {
        api
          .delete(state.id)
          .then(res => resolve(res))
          .catch(err => reject(err));
      });
    }
  }
};
