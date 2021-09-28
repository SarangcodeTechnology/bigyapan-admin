const state = () => ({
  accountTypes: [
    {
      id: null,
      title: null,
    },
  ],
  accountTypesPaginatedData: {
    data: [
      {
        id: null,
        title: null,
      },
    ],
    pagination: {
      total: null,
      per_page: null,
      current_page: null,
      total_pages: null
    }
  },
  accountType: {
    id: null,
    title: null,
  },
  isLoading: false,
  isCreating: false,
  createdData: {
    id: null,
    title: null,
  },
  isUpdating: false,
  updatedData: {
    id: null,
    title: null,
  },
  isDeleting: false,
  deletedData: {
    id: null,
    title: null,
  }
});

const mutations = {
  setAccountTypes: (state, accountTypes) => {
    state.accountTypes = accountTypes
  },

  setAccountTypesPaginated: (state, accountTypesPaginatedData) => {
    state.accountTypesPaginatedData = accountTypesPaginatedData
  },

  setAccountTypeDetail: (state, accountType) => {
    state.accountType = accountType
  },

  setDeleteAccountType: (state, id) => {
    state.accountTypesPaginatedData.data.filter(x => x.id !== id);
  },

  setAccountTypeDetailInput: (state, e) => {
    let accountType = state.accountType;
    accountType[e.target.name] = e.target.value;
    state.accountType = accountType
  },

  saveNewAccountTypes: (state, accountType) => {
    state.accountTypes.unshift(accountType)
    state.createdData = accountType;
  },

  saveUpdatedAccountType: (state, accountType) => {
    state.accountTypes.unshift(accountType)
    state.updatedData = accountType;
  },

  setAccountTypeIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setAccountTypeIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setAccountTypeIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setAccountTypeIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

};

const actions = {

  async fetchAllAccountTypes(state, query = null) {
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

    state.commit('setAccountTypeIsLoading', true);
    let url = `${process.env.BACKEND_API_URL}account-types`;
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
        const accountTypes = res.data.data.data;
        state.commit('setAccountTypes', accountTypes);
        const pagination = {
          total: res.data.data.total,  // total number of elements or items
          per_page: res.data.data.per_page, // items per page
          current_page: res.data.data.current_page, // current page (it will be automatically updated when accountTypes clicks on some page number).
          total_pages: res.data.data.last_page // total pages in record
        }
        res.data.data.pagination = pagination;
        state.commit('setAccountTypesPaginated', res.data.data);
        state.commit('setAccountTypeIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setAccountTypeIsLoading', false);
      });
  },

  async fetchDetailAccountType(state, id) {
    state.commit('setAccountTypeIsLoading', true);
    await this.$axios.get(`${process.env.BACKEND_API_URL}account-types/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('setAccountTypeDetail', res.data.data);
        state.commit('setAccountTypeIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setAccountTypeIsLoading', false);
      });
  },

  async storeAccountType(state, accountType) {
    state.commit('setAccountTypeIsCreating', true);
    await this.$axios.post(`${process.env.BACKEND_API_URL}account-types`, accountType, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('saveNewAccountTypes', res.data.data);
        state.commit('setAccountTypeIsCreating', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setAccountTypeIsCreating', false);
      });
  },

  async updateAccountType(state, accountType) {
    state.commit('setAccountTypeIsUpdating', true);
    state.commit('setAccountTypeIsUpdating', true);
    await this.$axios.post(`${process.env.BACKEND_API_URL}account-types/${accountType.id}?_method=PUT`, accountType, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('saveUpdatedAccountType', res.data.data);
        state.commit('setAccountTypeIsUpdating', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setAccountTypeIsUpdating', false);
      });
  },


  async deleteAccountType(state, id) {
    state.commit('setAccountTypeIsDeleting', true);
    await this.$axios.delete(`${process.env.BACKEND_API_URL}account-types/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('setDeleteAccountType', res.data.data.id);
        state.commit('setAccountTypeIsDeleting', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setAccountTypeIsDeleting', false);
      });
  },

  updateAccountTypeInput(state, e) {
    state.commit('setAccountTypeDetailInput', e);
  }
};

const getters = {
  accountTypeList: state => state.accountTypes,
  accountTypesPaginatedData: state => state.accountTypesPaginatedData,
  accountType: state => state.accountType,
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

