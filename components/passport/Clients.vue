<style scoped>
.action-link {
  cursor: pointer;
}
</style>

<template>
  <v-container fluid>
    <v-card>
      <v-card-title><h1>OAuth Clients</h1>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.stop="createClientModal=true">Create New Client</v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="oAuthClientsHeader" :items="clients">

          <template v-slot:item.actions="{ item }">
            <v-btn color="primary" @click="edit(item)">Edit</v-btn>
            <v-btn color="error" @click="destroy(item)">Delete</v-btn>
          </template>

        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="createClientModal" max-width="600">
      <v-card>
        <v-card-title><h3>Create Client</h3></v-card-title>
        <v-alert v-if="createForm.errors.length > 0">
          <p class="mb-0"><strong>Whoops!</strong> Something went wrong!</p>
          <br>
          <ul>
            <li v-for="error in createForm.errors">
              {{ error }}
            </li>
          </ul>
        </v-alert>
        <v-card-text>
          <v-form>
            <v-text-field filled v-model="createForm.name" label="Name"
                          placeholder="Something your users will recognize and trust."
            ></v-text-field>
            <v-text-field filled v-model="createForm.redirect" label="Redirect URL"
                          placeholder="Your application's authorization callback URL."
            ></v-text-field>
            <v-checkbox v-model="createForm.confidential"
                        label="Require the client to authenticate with a secret. Confidential clients can hold credentials in a secure way without exposing them to unauthorized parties. Public applications, such as native desktop or JavaScript SPA applications, are unable to hold secrets securely."></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click.stop="createClientModal=false">Close</v-btn>
          <v-btn color="primary" @click="store">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editClientModal" max-width="600">
      <v-card>
        <v-card-title><h3>Edit Client</h3></v-card-title>
        <v-alert v-if="editForm.errors.length > 0">
          <p class="mb-0"><strong>Whoops!</strong> Something went wrong!</p>
          <br>
          <ul>
            <li v-for="error in editForm.errors">
              {{ error }}
            </li>
          </ul>
        </v-alert>
        <v-card-text>
          <v-form>
            <v-text-field filled v-model="editForm.name" label="Name"
                          placeholder="Something your users will recognize and trust."
            ></v-text-field>
            <v-text-field filled v-model="editForm.redirect" label="Redirect URL"
                          placeholder="Your application's authorization callback URL."
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click.stop="editClientModal=false">Close</v-btn>
          <v-btn color="success" @click="update">Save Changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="clientSecretModal" max-width="600">
      <v-card>
        <v-card-title><h3>Client Secret</h3></v-card-title>
        <v-card-text>
          <p>
            Here is your new client secret. This is the only time it will be shown so don't lose it!
            You may now use this secret to make API requests.
          </p>
          <v-textarea v-model="clientSecret" readonly></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click.stop="clientSecretModal=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  /**
   * The component's data.
   */
  data() {
    return {
      createClientModal: false,
      editClientModal: false,
      clientSecretModal: false,
      clients: [],
      oAuthClientsHeader: [
        {text: 'Client ID', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Secret', value: 'secret'},
        {text: 'Actions', value: 'actions'},
      ],
      clientSecret: null,

      createForm: {
        errors: [],
        name: '',
        redirect: '',
        confidential: true
      },

      editForm: {
        errors: [],
        name: '',
        redirect: ''
      }
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
      this.getClients();
    },

    /**
     * Get all of the OAuth clients for the user.
     */
    getClients() {
      this.$axios.get(process.env.BACKEND_API_URL + 'oauth/clients', {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/GET_ACCESS_TOKEN"]
        }
      })
        .then(response => {
          this.clients = response.data;
        });
    },

    /**
     * Create a new OAuth client for the user.
     */
    store() {
      this.persistClient(
        'post',
        process.env.BACKEND_API_URL + 'oauth/clients',
        this.createForm,
        '#modal-create-client'
      );
    },

    /**
     * Edit the given client.
     */
    edit(client) {
      this.editForm.id = client.id;
      this.editForm.name = client.name;
      this.editForm.redirect = client.redirect;

      this.editClientModal = true;
    },

    /**
     * Update the client being edited.
     */
    update() {
      this.persistClient(
        'put',
        process.env.BACKEND_API_URL + 'oauth/clients/' + this.editForm.id,
        this.editForm,
        '#modal-edit-client'
      );
    },

    /**
     * Persist the client to storage using the given form.
     */
    persistClient(method, uri, form, modal) {
      form.errors = [];
      this.$axios[method](uri, form, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/GET_ACCESS_TOKEN"]
        }
      })
        .then(response => {
          this.getClients();

          form.name = '';
          form.redirect = '';
          form.errors = [];

          if (modal === "#modal-create-client") {
            this.createClientModal = false;
          } else if (modal === "#modal-edit-client") {
            this.editClientModal = false;
          }
console.log(response.data);
          if (response.data.secret) {
            this.showClientSecret(response.data.secret);
          }
        })
        .catch(error => {
          if (typeof error.response.data === 'object') {
            form.errors = _.flatten(_.toArray(error.response.data.errors));
          } else {
            form.errors = ['Something went wrong. Please try again.'];
          }
        });
    },

    /**
     * Show the given client secret to the user.
     */
    showClientSecret(clientSecret) {
      this.clientSecret = clientSecret;
      this.clientSecretModal = true;
    },

    /**
     * Destroy the given client.
     */
    destroy(client) {
      this.$root.confirm('Confirm Delete', 'Are you sure you want to delete ' + client.name + ' ?', {color: 'red'}).then((confirm) => {
        this.$axios.delete(process.env.BACKEND_API_URL + 'oauth/clients/' + client.id, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + this.$store.getters["auth/GET_ACCESS_TOKEN"]
          }
        })
          .then(response => {
            this.getClients();
          });
      }).catch((error) => {
        console.log(error);
      });

    }
  }
}
</script>
