const state = () => ({
  users: [],
  usersPaginatedData: {
    data: [],
    pagination: {
      total: null
    }
  },
  user: null,
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null
});

const mutations = {
  setUsers: (state, users) => {
    state.users = users
  },

  setUsersPaginated: (state, usersPaginatedData) => {
    state.usersPaginatedData = usersPaginatedData
  },

  setUserDetail: (state, user) => {
    state.user = user
  },

  setDeleteUser: (state, id) => {
    state.usersPaginatedData.data.filter(x => x.id !== id);
  },

  saveNewUsers: (state, user) => {
    state.users.unshift(user)
    state.createdData = user;
  },

  saveUpdatedUser: (state, user) => {
    state.users.unshift(user)
    state.updatedData = user;
  },

  setUserIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setUserIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setUserIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setUserIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

};

const actions = {

  async fetchAllUsers(state, query = null) {
    let page = '';
    let search = '';
    let perPage = '';
    let sortBy = '';
    let sortDesc = '';
    if (query !== null) {
      page = query.page;
      search = query.search;
      perPage = query.perPage;
      sortBy = query.sortBy;
      sortDesc = query.sortDesc;
    }

    state.commit('setUserIsLoading', true);
    let url = `${process.env.BACKEND_API_URL}users`;
    if (search === null || search.length <= 0) {
      url = `${url}?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortDesc=${sortDesc}`;
    } else {
      url = `${url}?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortDesc=${sortDesc}&search=${search}`
    }

    await this.$axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        const users = res.data.data.data;
        state.commit('setUsers', users);
        const pagination = {
          total: res.data.data.total,  // total number of elements or items
          per_page: res.data.data.per_page, // items per page
          current_page: res.data.data.current_page, // current page (it will be automatically updated when users clicks on some page number).
          total_pages: res.data.data.last_page // total pages in record
        }
        res.data.data.pagination = pagination;
        state.commit('setUsersPaginated', res.data.data);
        state.commit('setUserIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setUserIsLoading', false);
      });
  },

  async fetchDetailUser(state, id) {
    state.commit('setUserIsLoading', true);
    await this.$axios.get(`${process.env.BACKEND_API_URL}users/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('setUserDetail', res.data.data);
        state.commit('setUserIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setUserIsLoading', false);
      });
  },

  async storeUser(state, user) {
    state.commit('setUserIsCreating', true);
    await this.$axios.post(`${process.env.BACKEND_API_URL}users`, user, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('saveNewUsers', res.data.data);
        state.commit('setUserIsCreating', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setUserIsCreating', false);
      });
  },

  async updateUser(state, user) {
    state.commit('setUserIsUpdating', true);
    state.commit('setUserIsUpdating', true);
    await this.$axios.post(`${process.env.BACKEND_API_URL}users/${user.id}?_method=PUT`, user, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('saveUpdatedUser', res.data.data);
        state.commit('setUserIsUpdating', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setUserIsUpdating', false);
      });
  },


  async deleteUser(state, id) {
    state.commit('setUserIsDeleting', true);
    await this.$axios.delete(`${process.env.BACKEND_API_URL}users/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('setDeleteUser', res.data.data.id);
        state.commit('setUserIsDeleting', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setUserIsDeleting', false);
      });
  },
};

const getters = {
  userList: state => state.users,
  usersPaginatedData: state => state.usersPaginatedData,
  user: state => state.user,
  isLoading: state => state.isLoading,
  isCreating: state => state.isCreating,
  isUpdating: state => state.isUpdating,
  createdData: state => state.createdData,
  updatedData: state => state.updatedData,
  isDeleting: state => state.isDeleting,
  deletedData: state => state.deletedData
};

export default {
  state,
  mutations,
  actions,
  getters,
};

