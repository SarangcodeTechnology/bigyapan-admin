const state = () => ({
  editData: [],
});

const mutations = {
  SET_EDIT_DATA(state, payload) {
    state.editData = payload;
  }
};

const actions = {
  setEditData(state, payload) {
    state.commit('SET_EDIT_DATA', payload);
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};

