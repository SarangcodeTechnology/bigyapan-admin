<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <Nuxt/>
      </v-container>
    </v-main>
    <NotificationList/>
  </v-app>
</template>

<script>
import NotificationList from "../components/notification/NotificationList";

export default {
  components: {NotificationList},
  name: "login",
}
</script>

<style scoped>

</style>
