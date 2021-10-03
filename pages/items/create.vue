<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <h1 class="display-1">Item Form</h1>
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
                    v-model="item.user_id"
                    :error-messages="userErrors"
                    :items="resources.users"
                    autofocus
                    filled
                    item-text="name"
                    item-value="id"
                    label="User"
                    name="user_id"
                    placeholder="Select user..."
                    @blur="$v.item.user_id.$touch()"
                    @input="$v.item.user_id.$touch()"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="item.item_category_id"
                    :error-messages="itemCategoryErrors"
                    :items="resources.itemCategories"
                    autofocus
                    filled
                    item-text="title"
                    item-value="id"
                    label="Item Category"
                    name="item_category_id"
                    placeholder="Select item category..."
                    @blur="$v.item.item_category_id.$touch()"
                    @input="$v.item.item_category_id.$touch()"
                  ></v-autocomplete>
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
import {required} from "vuelidate/lib/validators";
import {mapState} from "vuex";
import {validationMixin} from "vuelidate";

export default {
  name: "create",
  mixins: [validationMixin],
  data() {
    return {
      valid: false,
      item: {}
    }
  },
  validations: {
    item: {
      user_id: {required},
      item_category_id: {required},
      item_subcategory_id: {required},
      item_name: {required},
      item_price: {required},
    }
  },
  methods: {
    onSave() {

    }
  },
  computed: {
    ...mapState({
      resources: (state) => state.webservice.resources,
    }),
    userErrors() {
      const errors = [];
      if (!this.$v.item.user_id.$dirty) return errors;
      !this.$v.item.user_id.required && errors.push('User is required.');
      return errors;
    },
    itemCategoryErrors() {
      const errors = [];
      if (!this.$v.item.item_category_id.$dirty) return errors;
      !this.$v.item.item_category_id.required && errors.push('Item category is required.');
      return errors;
    },
    itemSubCategoryErrors() {
      const errors = [];
      if (!this.$v.item.item_subcategory_id.$dirty) return errors;
      !this.$v.item.item_subcategory_id.required && errors.push('Item sub category is required.');
      return errors;
    },
    itemNameErrors() {
      const errors = [];
      if (!this.$v.item.item_name.$dirty) return errors;
      !this.$v.item.item_name.required && errors.push('Item name is required.');
      return errors;
    },
    itemPriceErrors() {
      const errors = [];
      if (!this.$v.item.item_price.$dirty) return errors;
      !this.$v.item.item_price.required && errors.push('Item price is required.');
      return errors;
    }
  }
}
</script>

<style scoped>

</style>
