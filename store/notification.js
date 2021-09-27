const state = () => ({
  notifications: [],

});

const mutations = {
  ADD_NOTIFICATION(state, notification) {
    state.notifications.push({
      type: notification.type,
      message: notification.message,
      id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
    })
  },
  REMOVE_NOTIFICATION(state, notificationToRemove) {
    state.notifications = state.notifications.filter(notification => {
      return notification.id !== notificationToRemove.id;
    })
  },
};

const actions = {
  addNotification(state, notification) {
    state.commit('ADD_NOTIFICATION', notification);
  },
  removeNotification(state, notification) {
    state.commit('REMOVE_NOTIFICATION', notification);
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};

