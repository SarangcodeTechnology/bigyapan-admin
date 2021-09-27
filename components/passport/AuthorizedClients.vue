<style scoped>
.action-link {
  cursor: pointer;
}
</style>

<template>
  <v-container fluid>
    <v-card>
      <v-card-title><h1>Authorized Applications</h1></v-card-title>
      <v-card-text>
        <v-data-table
          :headers="authorizedAppHeaders"
          :items="tokens"
        >
          <template v-slot:item.name="{ item }">
            {{ item.client.name }}
          </template>
          <template v-slot:item.scopes="{ item }">
            <template v-if="item.scopes.length>0"></template>
            {{ item.scopes.join(', ') }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn color="error" @click="revoke(item)">Revoke
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  /*
   * The component's data.
   */
  data() {
    return {
      tokens: [],
      authorizedAppHeaders: [{text: 'Name', value: 'name'}, {text: 'Scopes', value: "scopes"}, {
        text: 'Actions',
        value: 'actions'
      },],
    };
  },

  /**
   * Prepare the component (Vue 2.x).
   */
  mounted() {
    this.prepareComponent();
  },

  methods: {
    /**
     * Prepare the component (Vue 2.x).
     */
    prepareComponent() {
      this.getTokens();
    },

    /**
     * Get all of the authorized tokens for the user.
     */
    getTokens: function () {
      this.$axios.get(process.env.BACKEND_API_URL + 'oauth/tokens', {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/GET_ACCESS_TOKEN"]
        }
      })
        .then(response => {
          this.tokens = response.data;
        });
    },

    /**
     * Revoke the given token.
     */
    revoke(token) {
      this.$root.confirm('Confirm Revoke', 'Are you sure you want to revoke ' + token.name + ' ?', {color: 'red'}).then((confirm) => {
        this.$axios.delete(process.env.BACKEND_API_URL + 'oauth/tokens/' + token.id, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + this.$store.getters["auth/GET_ACCESS_TOKEN"]
          }
        })

          .then(response => {
            this.getTokens();
          });
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
</script>
