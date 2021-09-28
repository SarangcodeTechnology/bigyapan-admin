const state = () => ({
  itemSubCategories: [],
  itemSubCategoriesPaginatedData: {
    data: [],
    pagination: {
      total: null
    }
  },
  itemCategory: {
    title: null
  },
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null
});

const mutations = {
  setItemSubCategories: (state, itemSubCategories) => {
    state.itemSubCategories = itemSubCategories
  },

  setItemSubCategoriesPaginated: (state, itemSubCategoriesPaginatedData) => {
    state.itemSubCategoriesPaginatedData = itemSubCategoriesPaginatedData
  },

  setItemSubCategoryDetail: (state, itemCategory) => {
    state.itemCategory = itemCategory
  },

  setDeleteItemSubCategory: (state, id) => {
    state.itemSubCategoriesPaginatedData.data.filter(x => x.id !== id);
  },

  setItemSubCategoryDetailInput: (state, e) => {
    let itemCategory = state.itemCategory;
    itemCategory[e.target.name] = e.target.value;
    state.itemCategory = itemCategory
  },

  saveNewItemSubCategories: (state, itemCategory) => {
    state.itemSubCategories.unshift(itemCategory)
    state.createdData = itemCategory;
  },

  saveUpdatedItemSubCategory: (state, itemCategory) => {
    state.itemSubCategories.unshift(itemCategory)
    state.updatedData = itemCategory;
  },

  setItemSubCategoryIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setItemSubCategoryIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setItemSubCategoryIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setItemSubCategoryIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

};

const actions = {

  async fetchAllItemSubCategories(state, query = null) {
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

    state.commit('setItemSubCategoryIsLoading', true);
    let url = `${process.env.BACKEND_API_URL}item-sub-categories`;
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
        const itemSubCategories = res.data.data.data;
        state.commit('setItemSubCategories', itemSubCategories);
        const pagination = {
          total: res.data.data.total,  // total number of elements or items
          per_page: res.data.data.per_page, // items per page
          current_page: res.data.data.current_page, // current page (it will be automatically updated when itemSubCategories clicks on some page number).
          total_pages: res.data.data.last_page // total pages in record
        }
        res.data.data.pagination = pagination;
        state.commit('setItemSubCategoriesPaginated', res.data.data);
        state.commit('setItemSubCategoryIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemSubCategoryIsLoading', false);
      });
  },

  async fetchDetailItemSubCategory(state, id) {
    state.commit('setItemSubCategoryIsLoading', true);
    await this.$axios.get(`${process.env.BACKEND_API_URL}item-sub-categories/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('setItemSubCategoryDetail', res.data.data);
        state.commit('setItemSubCategoryIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemSubCategoryIsLoading', false);
      });
  },

  async storeItemSubCategory(state, itemCategory) {
    state.commit('setItemSubCategoryIsCreating', true);
    await this.$axios.post(`${process.env.BACKEND_API_URL}item-sub-categories`, itemCategory, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('saveNewItemSubCategories', res.data.data);
        state.commit('setItemSubCategoryIsCreating', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemSubCategoryIsCreating', false);
      });
  },

  async updateItemSubCategory(state, itemCategory) {
    state.commit('setItemSubCategoryIsUpdating', true);
    state.commit('setItemSubCategoryIsUpdating', true);
    await this.$axios.post(`${process.env.BACKEND_API_URL}item-sub-categories/${itemCategory.id}?_method=PUT`, itemCategory, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('saveUpdatedItemSubCategory', res.data.data);
        state.commit('setItemSubCategoryIsUpdating', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemSubCategoryIsUpdating', false);
      });
  },


  async deleteItemSubCategory(state, id) {
    state.commit('setItemSubCategoryIsDeleting', true);
    await this.$axios.delete(`${process.env.BACKEND_API_URL}item-sub-categories/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('setDeleteItemSubCategory', res.data.data.id);
        state.commit('setItemSubCategoryIsDeleting', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemSubCategoryIsDeleting', false);
      });
  },

  updateItemSubCategoryInput(state, e) {
    state.commit('setItemSubCategoryDetailInput', e);
  }
};

const getters = {
  itemCategoryList: state => state.itemSubCategories,
  itemSubCategoriesPaginatedData: state => state.itemSubCategoriesPaginatedData,
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

