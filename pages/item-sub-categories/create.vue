<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <h1 class="display-1">Item Sub Category Form</h1>
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
                  <v-autocomplete
                    v-model="itemSubCategory.item_category_id"
                    :error-messages="itemCategoryErrors"
                    :items="resources.itemCategories"
                    autofocus
                    filled
                    item-text="title"
                    item-value="id"
                    label="Item Category"
                    name="item_category_id"
                    placeholder="Select item category..."
                    prepend-inner-icon="fas fa-sitemap"
                    @blur="$v.itemSubCategory.item_category_id.$touch()"
                    @input="$v.itemSubCategory.item_category_id.$touch()"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="itemSubCategory.title"
                    :error-messages="titleErrors"
                    autocomplete="on"
                    autofocus
                    filled
                    label="Title"
                    name="title"
                    placeholder="Enter item sub category title here..."
                    prepend-inner-icon="fas fa-heading"
                    @blur="$v.itemSubCategory.title.$touch()"
                    @input="$v.itemSubCategory.title.$touch()"
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
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";
import {mapActions, mapGetters, mapState} from "vuex";


export default {
  name: "create",
  mixins: [validationMixin],
  data() {
    return {
      valid: false,
      itemSubCategory: {}
    }
  },
  computed: {
    ...mapGetters("itemSubCategory", ["isCreating", "createdData"]),
    ...mapState({
      resources: (state) => state.webservice.resources,
    }),
    titleErrors() {
      const errors = [];
      if (!this.$v.itemSubCategory.title.$dirty) return errors;
      !this.$v.itemSubCategory.title.required && errors.push('Title is required.');
      return errors;
    },
    itemCategoryErrors() {
      const errors = [];
      if (!this.$v.itemSubCategory.item_category_id.$dirty) return errors;
      !this.$v.itemSubCategory.item_category_id.required && errors.push('Item category is required.');
      return errors;
    },
  },
  validations: {
    itemSubCategory: {
      item_category_id: {required},
      title: {required},
    }
  },
  methods: {
    ...mapActions("itemSubCategory", ["storeItemSubCategory"]),
    onSave() {
      const {item_category_id, title} = this.itemSubCategory;
      this.storeItemSubCategory({
        item_category_id: item_category_id,
        title: title,
      });
    },
  }
}
</script>

<style scoped>

</style>
