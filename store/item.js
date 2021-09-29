const state = () => ({
  items: [
    {
      id: null,
      title: "",
      user: {
        name: ""
      },
      item_category: {
        title: ""
      },
      item_sub_category: {
        title: ""
      }
    }
  ],
  itemsPaginatedData: {
    data: [
      {
        id: null,
        title: "",
        user: {
          name: ""
        },
        item_category: {
          title: ""
        },
        item_sub_category: {
          title: ""
        }
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
});

const mutations = {
  setItemIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  }

};

const actions = {
  async fetchAllItems(){

  },
  async deleteItem(){

  }
};

const getters = {
  itemList: state => state.items,
  itemsPaginatedData: state => state.itemsPaginatedData,
  isLoading: state => state.isLoading
};

export default {
  state,
  mutations,
  actions,
  getters,
};

