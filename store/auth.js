const state = () => ({
  user: "",
  accessToken: "",
});

const mutations = {
  SET_USER(state, payload) {
    if (payload) {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      this.$cookiz.set('accessToken', payload.accessToken, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  },
  UNSET_USER(state) {
    state.user = "";
    state.accessToken = "";
  }
};

const actions = {
  loginOrRegister(state, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BACKEND_API_URL + payload.route, payload.data, {
        headers: {
          Accept: "application/json",
        }
      }).then(function (response) {
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    })
  },
  logout(state) {
    let temp = this;
    return new Promise((resolve, reject) => {
      this.$axios.post(process.env.BACKEND_API_URL + 'logout', {}, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
        }
      }).then(function (response) {
        if (response.status === 200) {
          state.commit("UNSET_USER");
          temp.$cookiz.remove('accessToken');
          window.localStorage.removeItem('bigyapanAdminVuex');


        }
        resolve(response);
      }).catch(function (error) {
        reject(error);
      });
    });
  },
};

const getters = {
  GET_USER(state) {
    return state.user;
  },
  GET_ACCESS_TOKEN(state) {
    return state.accessToken;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};

