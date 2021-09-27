<template>
  <v-container fluid>

        <AuthorizedClients/>

        <Clients/>

        <PersonalAccessTokens/>

  </v-container>
</template>

<script>
import AuthorizedClients from "../components/passport/AuthorizedClients";
import Clients from "../components/passport/Clients";
import PersonalAccessTokens from "../components/passport/PersonalAccessTokens";

export default {
  components: {
    AuthorizedClients,
    Clients,
    PersonalAccessTokens
  },
  data() {
    return {}
  },
  methods: {},
  created() {

  }
}
</script>

<style scoped>

</style>

