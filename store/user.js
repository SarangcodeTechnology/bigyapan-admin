const state = () => ({
  users: [{
    "id": null,
    "name": null,
    "email": null,
    "user_details": {
      "id": null,
      "user_id": null,
      "account_type_id": null,
      "address_street": null,
      "address_ward": null,
      "address_municipality_id": null,
      "address_district_id": null,
      "address_province_id": null,
      "address_country_id": null,
      "user_image": null,
      "phone_number": null,
      "user_description": null,
      "account_type": null,
      "address_municipality": null,
      "address_district": null,
      "address_province": null,
      "address_country": null
    }
  }],
  usersPaginatedData: {
    data: [{
      "id": null,
      "name": null,
      "email": null,
      "user_details": {
        "id": null,
        "user_id": null,
        "account_type_id": null,
        "address_street": null,
        "address_ward": null,
        "address_municipality_id": null,
        "address_district_id": null,
        "address_province_id": null,
        "address_country_id": null,
        "user_image": null,
        "phone_number": null,
        "user_description": null,
        "account_type": null,
        "address_municipality": null,
        "address_district": null,
        "address_province": null,
        "address_country": null
      }
    }],
    pagination: {
      total: null,
      per_page: null,
      current_page: null,
      total_pages: null,
    }
  },
  user: {
    "id": null,
    "name": null,
    "email": null,
    "user_details": {
      "id": null,
      "user_id": null,
      "account_type_id": null,
      "address_street": null,
      "address_ward": null,
      "address_municipality_id": null,
      "address_district_id": null,
      "address_province_id": null,
      "address_country_id": null,
      "user_image": null,
      "phone_number": null,
      "user_description": null,
      "account_type": null,
      "address_municipality": null,
      "address_district": null,
      "address_province": null,
      "address_country": null
    }
  },
  isLoading: false,
  isCreating: false,
  createdData: {
    "id": null,
    "name": null,
    "email": null,
    "user_details": {
      "id": null,
      "user_id": null,
      "account_type_id": null,
      "address_street": null,
      "address_ward": null,
      "address_municipality_id": null,
      "address_district_id": null,
      "address_province_id": null,
      "address_country_id": null,
      "user_image": null,
      "phone_number": null,
      "user_description": null,
      "account_type": null,
      "address_municipality": null,
      "address_district": null,
      "address_province": null,
      "address_country": null
    }
  },
  isUpdating: false,
  updatedData: {
    "id": null,
    "name": null,
    "email": null,
    "user_details": {
      "id": null,
      "user_id": null,
      "account_type_id": null,
      "address_street": null,
      "address_ward": null,
      "address_municipality_id": null,
      "address_district_id": null,
      "address_province_id": null,
      "address_country_id": null,
      "user_image": null,
      "phone_number": null,
      "user_description": null,
      "account_type": null,
      "address_municipality": null,
      "address_district": null,
      "address_province": null,
      "address_country": null
    }
  },
  isDeleting: false,
  deletedData: {
    "id": null,
    "name": null,
    "email": null,
    "user_details": {
      "id": null,
      "user_id": null,
      "account_type_id": null,
      "address_street": null,
      "address_ward": null,
      "address_municipality_id": null,
      "address_district_id": null,
      "address_province_id": null,
      "address_country_id": null,
      "user_image": null,
      "phone_number": null,
      "user_description": null,
      "account_type": null,
      "address_municipality": null,
      "address_district": null,
      "address_province": null,
      "address_country": null
    }
  }
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
        "Content-Types": "multipart/form-data",
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

  async updateUser(state, payload) {
    state.commit('setUserIsUpdating', true);
    state.commit('setUserIsUpdating', true);
    console.log(payload);
    await this.$axios.post(`${process.env.BACKEND_API_URL}users/${payload.id}?_method=PUT`, payload.formData, {
      headers: {
        Accept: "application/json",
        "Content-Types": "multipart/form-data",
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

