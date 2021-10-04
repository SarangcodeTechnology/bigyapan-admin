<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <h1 class="display-1">Item Category Form</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn :disabled="!valid" color="primary" @click="onSave()">
          <v-icon left>fas fa-save</v-icon>
          Save
        </v-btn>
      </v-col>
    </v-row>
    <v-form v-model="valid">
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="itemCategory.title"
                    :error-messages="titleErrors"
                    autocomplete="on"
                    autofocus
                    filled
                    label="Title"
                    placeholder="Enter your title here..."
                    prepend-inner-icon="fas fa-heading"
                    title="title"
                    @blur="$v.itemCategory.title.$touch()"
                    @input="$v.itemCategory.title.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>

  </v-container>
</template>

<script>
import
{validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";
import {mapActions, mapGetters, mapState} from "vuex";


export default {
  name: "edit",
  mixins: [validationMixin],
  data() {
    return {
      valid: false,
      id: null,
      previewImageUrl: "",
    }
  },
  computed: {
    ...mapGetters("itemCategory", ["isUpdating", "updatedData", "itemCategory", "isLoading"]),
    ...mapState({
      resources: (state) => state.webservice.resources,
    }),
    titleErrors() {
      const errors = [];
      if (!this.$v.itemCategory.title.$dirty) return errors;
      !this.$v.itemCategory.title.required && errors.push('Title is required.');
      return errors;
    },
  },
  validations: {
    itemCategory: {
      title: {required},
    }
  },
  methods: {
    ...mapActions("itemCategory", ["updateItemCategory","fetchDetailItemCategory"]),
    onSave() {
      const {title} = this.itemCategory;
      this.updateItemCategory({
        id: this.id,
        title: title,
      });
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchDetailItemCategory(this.$route.params.id);
  }

}
</script>

<style scoped>

</style>
