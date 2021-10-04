import error from "../layouts/error";

const state = () => ({
  items: [
    {
      id: null,
      user_id: null,
      item_category_id: null,
      item_sub_category_id: null,
      user: {
        name: ""
      },
      item_category: {
        title: ""
      },
      item_sub_category: {
        title: ""
      },
      item_name: null,
      item_price: null,
      item_price_negotiable: false,
      item_description: null

    }
  ],
  itemsPaginatedData: {
    data: [
      {
        id: null,
        user_id: null,
        item_category_id: null,
        item_sub_category_id: null,
        user: {
          name: ""
        },
        item_category: {
          title: ""
        },
        item_sub_category: {
          title: ""
        },
        item_name: null,
        item_price: null,
        item_price_negotiable: false,
        item_description: null
      }
    ],
    pagination: {
      total: null,
      per_page: null,
      current_page: null,
      total_pages: null
    }
  },
  isLoading: false,
  isUpdating: null,
  updatedData: {
    id: null,
    user_id: null,
    item_category_id: null,
    item_sub_category_id: null,
    user: {
      name: ""
    },
    item_category: {
      title: ""
    },
    item_sub_category: {
      title: ""
    },
    item_name: null,
    item_price: null,
    item_price_negotiable: false,
    item_description: null
  },
  item: {
    id: null,
    user_id: null,
    item_category_id: null,
    item_sub_category_id: null,
    user: {
      name: ""
    },
    item_category: {
      title: ""
    },
    item_sub_category: {
      title: ""
    },
    item_name: null,
    item_price: null,
    item_price_negotiable: false,
    item_description: null
  },
  isCreating: false,
  createdData: {
    id: null,
    user_id: null,
    item_category_id: null,
    item_sub_category_id: null,
    user: {
      name: ""
    },
    item_category: {
      title: ""
    },
    item_sub_category: {
      title: ""
    },
    item_name: null,
    item_price: null,
    item_price_negotiable: false,
    item_description: null
  },
});

const mutations = {
  setItemIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setItems(state, items) {
    state.items = items;
  },
  setItemsPaginated(state, itemsPaginatedData) {
    state.itemsPaginatedData = itemsPaginatedData;
  },
  setItemIsCreating(state, isCreating) {
    state.isCreating = isCreating;
  },
  saveNewItems(state, item) {
    state.items.unshift(item);
    state.createdData = item;
  },
  setItemIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },
  saveUpdatedItem(state, item) {
    state.items.unshift(item)
    state.updatedData = item;
  },
  setItemDetail: (state, item) => {
    state.item = item
  },

};

const actions = {
  async fetchDetailItem(state, id) {
    state.commit('setItemIsLoading', true);
    await this.$axios.get(`${process.env.BACKEND_API_URL}items/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        state.commit('setItemDetail', res.data.data);
        state.commit('setItemIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        state.commit('setItemIsLoading', false);
      });
  },
  async updateItem(state, item) {
    state.commit('setItemIsUpdating', true);
    await this.$axios.post(`${process.env.BACKEND_API_URL}items/${item.id}?_method=PUT`, item, {
      headers: {
        Accept: 'application/json',
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    }).then(res => {
      state.commit('saveUpdatedItem', res.data.data);
      state.commit('setItemIsUpdating', false);
    }).catch(err => {
      console.log('error', err);
      state.commit('setItemIsUpdating', false);
    });
  },
  async storeItem(state, item) {
    state.commit('setItemIsCreating', true);
    await this.$axios.post(
      `${process.env.BACKEND_API_URL}items`, item, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
        }
      }
    ).then(res => {
        state.commit('saveNewItems', res.data.data);
        state.commit('setItemIsCreating', false);
      }
    ).catch(err => {
      console.log('error', err);
      state.commit('setItemIsCreating', false);
    });
  },
  async fetchAllItems(state, query = null) {
    let page = '';
    let search = '';
    let perPage = '';
    let sortBy = '';
    let sortDesc = '';
    if (query != null) {
      page = query.page;
      search = query.search;
      perPage = query.perPage;
      sortBy = query.sortBy;
      sortDesc = query.sortDesc;
    }
    state.commit('setItemIsLoading', true);
    let url = `${process.env.BACKEND_API_URL}items`;
    if (search === null || search.length <= 0) {
      url = `${url}?page=${page}&perPage=${perPage}&sortBy${sortBy}&sortDesc${sortDesc}`;
    } else {
      url = `${url}?page=${page}&perPage=${perPage}&sortBy${sortBy}&sortDesc${sortDesc}&search${search}`;
    }

    await this.$axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + state.rootGetters['auth/GET_ACCESS_TOKEN']
      }
    })
      .then(res => {
        const items = res.data.data;
        console.log(items);
        state.commit('setItems', items);
        const pagination = {
          total: res.data.data.total,  // total number of elements or items
          per_page: res.data.data.per_page, // items per page
          current_page: res.data.data.current_page, // current page (it will be automatically updated when itemCategories clicks on some page number).
          total_pages: res.data.data.last_page // total pages in record
        }
        res.data.data.pagination = pagination;
        state.commit('setItemsPaginated', res.data.data);
        state.commit('setItemIsLoading', false);
      })
      .catch(err => {
        console.log('error', err);
        state.commit('setItemIsLoading', false);
      })

  },
  async deleteItem() {

  },

};

const getters = {
  itemList: state => state.items,
  itemsPaginatedData: state => state.itemsPaginatedData,
  isLoading: state => state.isLoading,
  updatedData: state => state.updatedData,
  item: state => state.item,
  isUpdating: state => state.isUpdating,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

