const state = () => ({
  itemCategories: [
    {
      id: null,
      title: "",
    }
  ],
  itemCategoriesPaginatedData: {
    data: [
      {
        id: null,
        title: "",
      }
    ],
    pagination: {
      total: null,
      per_page: null,
      current_page: null,
      total_pages: null,
    }
  },
  itemCategory: {
    id: null,
    title: "",
  },
  isLoading: false,
  isCreating: false,
  createdData: {
    id: null,
    title: "",
  },
  isUpdating: false,
  updatedData: {
    id: null,
    title: "",
  },
  isDeleting: false,
  deletedData: {
    id: null,
    title: "",
  }
});

const mutations = {
  setItemCategories: (state, itemCategories) => {
    state.itemCategories = itemCategories
  },

  setItemCategoriesPaginated: (state, itemCategoriesPaginatedData) => {
    state.itemCategoriesPaginatedData = itemCategoriesPaginatedData
  },

  setItemCategoryDetail: (state, itemCategory) => {
    state.itemCategory = itemCategory
  },

  setDeleteItemCategory: (state, id) => {
    state.itemCategoriesPaginatedData.data.filter(x => x.id !== id);
  },

  saveNewItemCategories: (state, itemCategory) => {
    state.itemCategories.unshift(itemCategory)
    state.createdData = itemCategory;
  },

  saveUpdatedItemCategory: (state, itemCategory) => {
    state.itemCategories.unshift(itemCategory)
    state.updatedData = itemCategory;
  },

  setItemCategoryIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setItemCategoryIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setItemCategoryIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setItemCategoryIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

};

const actions = {

  async fetchAllItemCategories(state, query = null) {
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

    state.commit('setItemCategoryIsLoading', true);
    let url = `${process.env.BACKEND_API_URL}item-categories`;
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
        const itemCategories = res.data.data.data;
        state.commit('setItemCategories', itemCategories);
        const pagination = {
          total: res.data.data.total,  // total number of elements or items
          per_page: res.data.data.per_page, // items per page
          current_page: res.data.data.current_page, // current page (it will be automatically updated when itemCategories clicks on some page number).
          total_pages: res.data.data.last_page // total pages in record
        }
        res.data.data.pagination = pagination;
        state.commit('setItemCategoriesPaginated', res.data.data);
        state.commit('setItemCategoryIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemCategoryIsLoading', false);
      });
  },

  async fetchDetailItemCategory(state, id) {
    state.commit('setItemCategoryIsLoading', true);
    await this.$axios.get(`${process.env.BACKEND_API_URL}item-categories/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('setItemCategoryDetail', res.data.data);
        state.commit('setItemCategoryIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemCategoryIsLoading', false);
      });
  },

  async storeItemCategory(state, itemCategory) {
    state.commit('setItemCategoryIsCreating', true);
    await this.$axios.post(`${process.env.BACKEND_API_URL}item-categories`, itemCategory, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('saveNewItemCategories', res.data.data);
        state.commit('setItemCategoryIsCreating', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemCategoryIsCreating', false);
      });
  },

  async updateItemCategory(state, itemCategory) {
    state.commit('setItemCategoryIsUpdating', true);
    await this.$axios.post(`${process.env.BACKEND_API_URL}item-categories/${itemCategory.id}?_method=PUT`, itemCategory, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('saveUpdatedItemCategory', res.data.data);
        state.commit('setItemCategoryIsUpdating', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemCategoryIsUpdating', false);
      });
  },


  async deleteItemCategory(state, id) {
    state.commit('setItemCategoryIsDeleting', true);
    await this.$axios.delete(`${process.env.BACKEND_API_URL}item-categories/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('setDeleteItemCategory', res.data.data.id);
        state.commit('setItemCategoryIsDeleting', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemCategoryIsDeleting', false);
      });
  },
};

const getters = {
  itemCategoryList: state => state.itemCategories,
  itemCategoriesPaginatedData: state => state.itemCategoriesPaginatedData,
  itemCategory: state => state.itemCategory,
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

