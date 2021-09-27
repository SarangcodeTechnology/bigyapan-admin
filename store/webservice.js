const state = () => ({
  resources: [],
  isSyncingResources: false,
});

const mutations = {
  SYNC_RESOURCES(state, payload) {
    state.resources = payload;
  },
  SET_IS_SYNCING_RESOURCES(state, payload) {
    state.isSyncingResources = payload;
  }
};

const actions = {
  syncResources(state) {
    const temp = this;
    state.commit('SET_IS_SYNCING_RESOURCES', true);
    state.dispatch("makeGetRequest", {
      route: "sync-resources"
    }).then(function (response) {
      state.commit("SYNC_RESOURCES", response.data.data);
      state.dispatch("notification/addNotification", {
        type: response.data.type,
        message: response.data.message,
      }, {root: true});
      state.commit('SET_IS_SYNCING_RESOURCES', false);
    }).catch(function (error) {
      state.dispatch("notification/addNotification", {
        type: "error",
        message: error,
      }, {root: true});
      state.commit('SET_IS_SYNCING_RESOURCES', false);
    });
  },

  makePostRequest(state, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BACKEND_API_URL + payload.route, payload.data, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
        }
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  makeGetRequest(state, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(process.env.BACKEND_API_URL + payload.route, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
        }
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  deleteData(state, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(process.env.BACKEND_API_URL + 'delete', payload, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
          }
        })
        .then(function (response) {
          state.dispatch("notification/addNotification", {
            type: response.data.type,
            message: response.data.message,
          }, {root: true});
          resolve(response);
        })
        .catch(function (error) {
          state.dispatch("notification/addNotification", {
            type: "error",
            message: error,
          }, {root: true});
          reject(error);
        });
    });
  },
};

const getters =
  {
    countries: function (state) {
      return state.resources.addresses;
    },
    isSyncingResources: state => state.isSyncingResources,
  };

export default {
  state,
  mutations,
  actions,
  getters,
};

