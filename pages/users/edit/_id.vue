<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <h1 class="display-1">User Form</h1>
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
        <v-col cols="8">
          <v-card>
            <v-card-title><h1 class="title">Basic Information</h1>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.name"
                    :error-messages="nameErrors"
                    autocomplete="on"
                    autofocus
                    filled
                    label="Name"
                    name="name"
                    placeholder="Enter your name here..."
                    prepend-inner-icon="fas fa-user"
                    @blur="$v.user.name.$touch()"
                    @input="$v.user.name.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.email"
                    :error-messages="emailErrors"
                    autocomplete="on"
                    autofocus
                    filled
                    label="Email"
                    name="email"
                    placeholder="Enter your email here..."
                    prepend-inner-icon="fas fa-envelope"
                    @blur="$v.user.email.$touch()"
                    @input="$v.user.email.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.user_details.phone_number"
                    :error-messages="phoneNumberErrors"
                    autocomplete="on"
                    autofocus
                    filled
                    label="Phone Number"
                    name="user_details.phone_number"
                    placeholder="Enter your phone number here..."
                    prepend-inner-icon="fas fa-phone"
                    @blur="$v.user.user_details.phone_number.$touch()"
                    @input="$v.user.user_details.phone_number.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="user.user_details.account_type_id"
                    :error-messages="accountTypeErrors"
                    :items="resources.accountTypes"
                    autofocus
                    filled
                    item-text="title"
                    item-value="id"
                    label="Account Type"
                    name="user_details.account_type_id"
                    placeholder="Select your account type..."
                    prepend-inner-icon="fas fa-user-circle"
                    @blur="$v.user.user_details.account_type_id.$touch()"
                    @input="$v.user.user_details.account_type_id.$touch()"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="user.user_details.user_description"
                    filled
                    label="User Description"
                    name="user_details.user_description"
                    placeholder="Enter user description here..."

                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card>
            <v-card-title><h1 class="title">User Image</h1>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <v-file-input v-model="user.user_details.user_image" filled
                            label="User Image" name="user_details.user_image"
                            placeholder="Please upload your image..."
                            prepend-icon=""
                            prepend-inner-icon="fas fa-camera"
                            user_details.user_description @change="previewImage"
              ></v-file-input>
              <v-container fill-height>
                <v-row align="center" justify="center">
                  <v-avatar class="my-2" size="150px">
                    <v-img :aspect-ratio="1/1"
                           :src="previewImageUrl?previewImageUrl :'/images/user_image_placeholder.png'"></v-img>
                  </v-avatar>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title><h1 class="title">Address Information</h1>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="user.user_details.address_country_id"
                    :items="countries"
                    filled
                    item-text="title"
                    item-value="id"
                    label="Country"
                    name="user_details.address_country_id"
                    placeholder="Select your country..."

                  ></v-autocomplete>
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="user.user_details.address_province_id"
                    :items="provinces"
                    filled
                    item-text="title"
                    item-value="id"
                    label="Province"
                    name="user_details.address_province_id"
                    placeholder="Select your province..."

                  ></v-autocomplete>
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="user.user_details.address_district_id"
                    :items="districts"
                    filled
                    item-text="title"
                    item-value="id"
                    label="District"
                    name="user_details.address_district_id"
                    placeholder="Select your district..."

                  ></v-autocomplete>
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="user.user_details.address_municipality_id"
                    :items="municipals"
                    filled
                    item-text="title"
                    item-value="id"
                    label="Municipality"
                    name="user_details.address_municipality_id"
                    placeholder="Select your municipality..."

                  ></v-autocomplete>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="user.user_details.address_ward"
                    filled
                    label="Ward No."
                    name="user_details.address_ward"
                    placeholder="Enter your ward here..."

                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="user.user_details.address_street"
                    filled
                    label="Street"
                    name="user_details.address_street"
                    placeholder="Enter your street here..."

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
import {email, required} from "vuelidate/lib/validators";
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
    ...mapGetters("user", ["isUpdating", "updatedData", "user", "isLoading"]),
    ...mapGetters("webservice", ["countries"]),
    ...mapState({
      resources: (state) => state.webservice.resources,
    }),
    provinces: function () {
      const temp = this;
      let data = [];
      this.countries.forEach(function (country) {
        if (country.id === temp.user.user_details.address_country_id) {
          data = country.provinces;
        }
      });
      return data;
    },
    districts: function () {
      const temp = this;
      let data = [];
      this.provinces.forEach(function (province) {
        if (province.id === temp.user.user_details.address_province_id) {
          data = province.districts;
        }
      });
      return data;
    },
    municipals: function () {
      const temp = this;
      let data = [];
      this.districts.forEach(function (district) {
        if (district.id === temp.user.user_details.address_district_id) {
          data = district.municipals;
        }
      });
      return data;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.user.name.$dirty) return errors;
      !this.$v.user.name.required && errors.push('Name is required.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.required && errors.push('Email is required.');
      !this.$v.user.email.email && errors.push('Enter a valid email format.');
      return errors;
    },
    accountTypeErrors() {
      const errors = [];
      if (!this.$v.user.user_details.account_type_id.$dirty) return errors;
      !this.$v.user.user_details.account_type_id.required && errors.push('Account Type is required.');
      return errors;
    },
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.user.user_details.phone_number.$dirty) return errors;
      !this.$v.user.user_details.phone_number.required && errors.push('Phone number is required.');
      return errors;
    },
  },
  validations: {
    user: {
      name: {required},
      email: {required, email},
      user_details: {
        account_type_id: {required},
        phone_number: {required},
      }
    }
  },
  methods: {
    ...mapActions("user", ["updateUser", "fetchDetailUser"]),
    onSave() {
      const {name, email} = this.user;
      const {
        id,
        phone_number,
        account_type_id,
        user_description,
        user_image,
        address_country_id,
        address_province_id,
        address_district_id,
        address_municipality_id,
        address_ward,
        address_street
      } = this.user.user_details;

      let formData = new FormData();

      formData.append("user", JSON.stringify({
        id: this.id,
        name: name,
        email: email,
        user_details: {
          id: id,
          phone_number: phone_number,
          account_type_id: account_type_id,
          user_description: user_description,
          user_image: user_image,
          address_country_id: address_country_id,
          address_province_id: address_province_id,
          address_district_id: address_district_id,
          address_municipality_id: address_municipality_id,
          address_ward: address_ward,
          address_street: address_street
        }
      }));
      formData.append("user_image", this.user.user_details.user_image);
      this.updateUser({
        formData: formData,
        id:this.user.id,
      });

      // this.updateUser({
      //   id: this.id,
      //   name: name,
      //   email: email,
      //   user_details: {
      //     id: id,
      //     phone_number: phone_number,
      //     account_type_id: account_type_id,
      //     user_description: user_description,
      //     user_image: user_image,
      //     address_country_id: address_country_id,
      //     address_province_id: address_province_id,
      //     address_district_id: address_district_id,
      //     address_municipality_id: address_municipality_id,
      //     address_ward: address_ward,
      //     address_street: address_street
      //   }
      // });
    },
    previewImage(file) {
      if (!file) {
        this.previewImageUrl = null;
        return;
      }
      this.createImage(file);
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    let temp = this;
    this.id = this.$route.params.id;
    this.fetchDetailUser(this.$route.params.id).then(function (response) {
      temp.previewImageUrl = process.env.BACKEND_BASE_URL + 'storage/images/user-images/' + temp.user.user_details.user_image;
    });

  }

}
</script>

<style scoped>

</style>
