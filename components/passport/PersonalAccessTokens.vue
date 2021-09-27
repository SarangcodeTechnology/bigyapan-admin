<style scoped>
.action-link {
  cursor: pointer;
}
</style>

<template>
  <v-container fluid>
    <v-card>
      <v-card-title><h1>Personal Access Tokens</h1>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="createTokenModal=true">Create New Token</v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="personalAccessTokensHeader" :items="tokens">
          <template v-slot:item.name="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn color="error" @click="revoke(item)">Revoke</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="createTokenModal" max-width="600">
      <v-card>
        <v-card-title><h3>Create Token</h3></v-card-title>
        <v-card-text>
          <v-alert v-if="form.errors.length > 0">
            <p class="mb-0"><strong>Whoops!</strong> Something went wrong!</p>
            <br>
            <ul>
              <li v-for="error in form.errors">
                {{ error }}
              </li>
            </ul>
          </v-alert>
          <v-form>
            <v-text-field filled v-model="form.name" label="Name"
                          placeholder="Enter token name here..."></v-text-field>
            <template v-if="scopes.length>0">
              <template v-for="scope in scopes">
                <v-checkbox v-model="form.scopes">
                  {{ scope.id }}
                </v-checkbox>
              </template>
            </template>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click.stop="createTokenModal=false">Close</v-btn>
          <v-btn color="success" @click="store">Create</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <v-dialog v-model="accessTokenModal" max-width="600">
      <v-card>
        <v-card-title><h3>Personal Access Token</h3></v-card-title>
        <v-card-text>
          <p>
            Here is your new personal access token. This is the only time it will be shown so don't lose
            it!
            You may now use this token to make API requests.
          </p>
          <v-textarea v-model="accessToken" readonly></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click.stop="accessTokenModal=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  /*
   * The component's data.
   */
  data() {
    return {
      accessToken: null,
      tokens: [],
      scopes: [],
      headers: [{text: 'Name', value: 'name'}, {text: 'Actions', value: 'actions'}],
      form: {
        name: '',
        scopes: [],
        errors: []
      },
      personalAccessTokensHeader: [{text: 'Name', value: 'name'}, {text: 'Actions', value: 'actions'}],
      createTokenModal: false,
      accessTokenModal: false,
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
     * Prepare the component.
     */
    prepareComponent() {
      this.getTokens();
      this.getScopes();
    },

    /**
     * Get all of the personal access tokens for the user.
     */
    getTokens() {
      this.$axios.get(process.env.BACKEND_API_URL + 'oauth/personal-access-tokens', {
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
     * Get all of the available scopes.
     */
    getScopes() {
      this.$axios.get(process.env.BACKEND_API_URL + 'oauth/scopes', {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/GET_ACCESS_TOKEN"]
        }
      })
        .then(response => {
          this.scopes = response.data;
        });
    },

    /**
     * Create a new personal access token.
     */
    store() {
      this.accessToken = null;

      this.form.errors = [];

      this.$axios.post(process.env.BACKEND_API_URL + 'oauth/personal-access-tokens', this.form, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/GET_ACCESS_TOKEN"]
        }
      })
        .then(response => {
          this.form.name = '';
          this.form.scopes = [];
          this.form.errors = [];

          this.tokens.push(response.data.token);

          this.showAccessToken(response.data.accessToken);
        })
        .catch(error => {
          if (typeof error.response.data === 'object') {
            this.form.errors = _.flatten(_.toArray(error.response.data.errors));
          } else {
            this.form.errors = ['Something went wrong. Please try again.'];
          }
        });
    },

    /**
     * Show the given access token to the user.
     */
    showAccessToken(accessToken) {
      this.createTokenModal = false;
      this.accessToken = accessToken;
      this.accessTokenModal = true;
    },

    /**
     * Revoke the given token.
     */
    revoke(token) {
      this.$root.confirm('Confirm Revoke', 'Are you sure you want to revoke ' + token.name + ' ?', {color: 'error'}).then((confirm) => {
        this.$axios.delete(process.env.BACKEND_API_URL + 'oauth/personal-access-tokens/' + token.id, {
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
