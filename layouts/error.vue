<template>
  <v-app>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="5">
          <v-card class="pa-6" dark elevation="0" shaped>
            <v-card-title><h1 class="display-4 font-weight-bold">
              OOPS !</h1>
            </v-card-title>
            <v-divider/>
            <v-card-subtitle><h1 v-if="error.statusCode===404" class="display-1 text-uppercase">
              Page not found</h1>
              <h1 v-else class="display-1 text-uppercase">
                Something went wrong</h1></v-card-subtitle>
            <v-card-text>
              <h1 class="title"><strong>ERROR CODE {{ error.statusCode }}</strong></h1>
              <p v-if="error.statusCode===404" class="body-1 pt-2">Sorry for the inconvenience, but the page you are
                looking for might have been removed, had its name changed or is temporarily unavailable.</p>
              <p v-else class="body-1 pt-2">Sorry for the inconvenience, but it seems like an error has been occurred.
                You can try going back or returning to the dashboard and continue from there.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn :to="localePath('/')" depressed x-large>
                <span>To Dashboard</span>
                <v-icon right>fas fa-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-app>
</template>

<script>
export default {
  layout: 'login',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
