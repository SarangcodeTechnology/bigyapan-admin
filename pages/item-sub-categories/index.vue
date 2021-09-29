<template>
  <v-container fluid>
    <v-toolbar extended rounded>
      <v-toolbar-title><h1 class="display-1">Item Sub Categories</h1></v-toolbar-title>
      <v-spacer/>
      <v-btn
        :to="localePath('/item-sub-categories/create')"
        class="d-flex align-self-center"
        color="primary" depressed>
        <v-icon left>fas fa-plus-circle</v-icon>
        <span>Add</span></v-btn
      >
    </v-toolbar>
    <v-card class="mx-4 mt-n10">
      <v-card-text>
        <client-only>
          <v-data-table
            :headers="headers"
            :hide-default-footer="true"
            :items="itemSubCategoriesPaginatedData.data"
            :items-per-page="query.perPage"
            :loading="isLoading"
            :options.sync="options"
            :page="query.page"
            :pageCount="itemSubCategoriesPaginatedData.pagination.total_pages"
            :server-items-length="itemSubCategoriesPaginatedData.pagination.total"
            :sort-by.sync="query.sortBy"
            :sort-desc.sync="query.sortDesc"
            fixed-header
            loading-text="Fetching data. Please wait..."
          >
            <template v-slot:top="{ pagination, options, updateOptions }">
              <v-container fluid>
                <v-row>
                  <v-col cols="4">
                    <v-text-field v-model="query.search" append-icon="fas fa-search" dense filled
                                  label="Search..." @change="getDataFromApi"
                                  @click:append="getDataFromApi"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="8">
                    <v-data-footer
                      :items-per-page-options="[10,25,50,100]"
                      :options.sync="options"
                      :pagination="pagination"
                      :show-first-last-page="true"
                      first-icon="fas fa-angle-double-left"
                      items-per-page-text="$vuetify.dataTable.itemsPerPageText"
                      last-icon="fas fa-angle-double-right"
                      next-icon="fas fa-angle-right"
                      prev-icon="fas fa-angle-left"
                      @update:options="updateOptions"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </template>
            <template v-slot:item.actions="{ item }">
              <div class="d-flex justify-content-center align-items-center">
                <v-btn :to=" localePath(`/item-sub-categories/edit/${item.id}`) " fab icon x-small>
                  <v-icon>fas fa-pencil-alt</v-icon>
                </v-btn>
                <v-btn color="error" fab icon x-small @click="confirm(item)">
                  <v-icon>fas fa-trash-alt</v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:item.item_category.title="{ item }">
              <div class="d-flex justify-content-center align-items-center">
                <v-chip>
                  {{ item.item_category.title }}
                </v-chip>
              </div>
            </template>
          </v-data-table>
        </client-only>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'index',
  data() {
    return {
      query: {
        page: 1,
        search: '',
        perPage: 10,
      },
      options: {},
      headers: [
        {text: "#", value: "actions", width: "1%"},
        {text: "Title", value: "title"},
        {text: "Item Category", value: "item_category.title"},
      ],
    };
  },
  watch: {
    //this one will populate new data set when itemSubCategory changes current page.
    options: {
      handler(e) {
        this.query.page = e.page;
        this.query.perPage = e.itemsPerPage;
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  created() {
    this.getDataFromApi();
  },
  computed: {
    ...mapGetters("itemSubCategory", [
      "itemSubCategoryList", "itemSubCategoriesPaginatedData", "isLoading", "isDeleting",
    ])
  },
  methods: {
    ...mapActions("itemSubCategory", [
      "fetchAllItemSubCategories", "deleteItemSubCategory"
    ]),
    getDataFromApi() {
      this.fetchAllItemSubCategories(this.query);
    },
    confirm(item) {
      const temp = this;
      this.$root.confirm('Confirm Delete', 'Are you sure you want to delete ' + item.title + '?', {color: 'red'}).then((confirm) => {
        temp.deleteItemSubCategory(item.id);
        temp.fetchAllItemSubCategories({
          page: 1,
          search: '',
          perPage: 10,
        });
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
</script>
<style scoped>

</style>
