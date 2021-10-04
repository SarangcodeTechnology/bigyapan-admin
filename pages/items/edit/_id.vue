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
            :items="itemCategories"
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
        <v-col cols="6">
          <v-autocomplete
            v-model="item.item_sub_category_id"
            :error-messages="itemSubCategoryErrors"
            :items="itemSubCategories"
            autofocus
            filled
            item-text="title"
            item-value="id"
            label="Items Sub Category"
            name="item_sub_category_id"
            placeholder="Select item sub category..."
            @blur="$v.item.item_sub_category_id.$touch()"
            @input="$v.item.item_sub_category_id.$touch()"
          ></v-autocomplete>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="item.item_name"
            :error-messages="itemNameErrors"
            autocomplete="on"
            autofocus
            filled
            label="Item Name"
            name="item_name"
            placeholder="Enter item title here..."
            prepend-inner-icon="fas fa-heading"
            @blur="$v.item.item_name.$touch()"
            @input="$v.item.item_name.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="item.item_price"
            :error-messages="itemPriceErrors"
            autocomplete="on"
            autofocus
            filled
            label="Item Price"
            name="item_price"
            placeholder="Enter item price here..."
            prepend-inner-icon="fas fa-heading"
            @blur="$v.item.item_price.$touch()"
            @input="$v.item.item_price.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-checkbox
            v-model="item.item_price_negotiable"
            label="Price Negotiable"
          ></v-checkbox>
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="item.item_description"
            filled
            label="Item Description"
            name="item_description"
            placeholder="Enter item description here..."
          ></v-textarea>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import
{validationMixin} from "vuelidate";
import {decimal, required} from "vuelidate/lib/validators";
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
    ...mapGetters("item", ["isUpdating", "updatedData", "item", "isLoading"]),
    ...mapGetters("webservice", ["itemCategories"]),
    ...mapState({
      resources: (state) => state.webservice.resources,
    }),
    itemSubCategories: function () {
      const temp = this;
      let data = [];
      this.itemCategories.forEach(function (itemCategory) {
        if (itemCategory.id === temp.item.item_category_id) {
          data = itemCategory.item_sub_categories;
        }
      });
      return data;
    },
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
      if (!this.$v.item.item_sub_category_id.$dirty) return errors;
      !this.$v.item.item_sub_category_id.required && errors.push('Item sub category is required.');
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
      !this.$v.item.item_price.decimal && errors.push('Item price must be numeric.');
      return errors;
    }
  }, validations: {
    item: {
      user_id: {required},
      item_category_id: {required},
      item_sub_category_id: {required},
      item_name: {required},
      item_price: {required, decimal},
    }
  },
  methods: {
    ...mapActions("item", ["updateItem", "fetchDetailItem"]),
    onSave() {
      const {
        user_id,
        item_category_id,
        item_sub_category_id,
        item_name,
        item_price,
        item_price_negotiable,
        item_description
      } = this.item;
      this.updateItem(
        {
          id: this.id,
          user_id: user_id,
          item_category_id: item_category_id,
          item_sub_category_id: item_sub_category_id,
          item_name: item_name,
          item_price: item_price,
          item_price_negotiable: item_price_negotiable,
          item_description: item_description,
        }
      );

    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchDetailItem(this.$route.params.id);
  }

}
</script>

<style scoped>

</style>
