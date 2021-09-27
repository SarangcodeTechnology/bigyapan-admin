<template>
    <v-container class="notification-list">
        <NotificationMessage v-for="notification in notifications" :key="notification.id"
                              :notification="notification"/>
    </v-container>
</template>

<script>
import {mapState} from "vuex";
import NotificationMessage from "./NotificationMessage";

export default {
  components: {NotificationMessage},
  data() {
        return {

        }
    },
    computed: {
        ...mapState({notifications: state => state.notification.notifications}),
    }
}
</script>

<style scoped>
.notification-list {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 15px;
    width: 320px !important;
    z-index: 2000;
}
</style>
