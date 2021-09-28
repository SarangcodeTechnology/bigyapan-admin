<template>
  <v-app>
    <!-- Admin Panel Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      :color="this.$vuetify.breakpoint.name !=='lg' && this.$vuetify.breakpoint.name !=='xl'?'primary':'transparent'"
      :dark="this.$vuetify.breakpoint.name !=='lg' && this.$vuetify.breakpoint.name !=='xl'?true:false"
      :mini-variant="miniVariant"
      app
      fixed
      floating
    >
      <v-list
              nav>
        <v-list-item-group active-class="primary">
          <v-tooltip v-for="(item, i) in items" :key="i" right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item
                           :to="localePath(item.to)"
                           exact
                           router
                           v-bind="attrs"
                           v-on="on"
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <span>{{ $t(item.title) }}</span>
          </v-tooltip>
        </v-list-item-group>


      </v-list>
    </v-navigation-drawer>

    <!-- Admin Panel App Bar -->
    <v-app-bar
      :class="!clipped?'mt-2 mx-2':''"
      :clipped-left="clipped"
      :rounded="!clipped?'lg':'0'"
      app
      fixed
      flat
    >
      <div>
        <v-img v-if="!miniVariant" alt="bigyapan_logo" contain src="/images/logo_bigyapan.svg"></v-img>
        <v-list-item-avatar v-else>
          <v-img alt="bigyapan_logo" contain src="/images/logo_only_bigyapan.svg"></v-img>
        </v-list-item-avatar>
      </div>
      <v-hover v-slot="{hover}">
        <v-sheet class="ml-2" fluid rounded="pill">

          <!--      Hide Drawer Button-->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-app-bar-nav-icon v-bind="attrs"
                                  v-on="on"
                                  @click.stop="drawer = !drawer"/>
            </template>
            <span v-if="drawer">Hide Drawer</span>
            <span v-else>Show Drawer</span>
          </v-tooltip>
          <!--Drawer Mini Variant Switch-->
          <v-tooltip v-if="hover" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon
                     v-bind="attrs"
                     v-on="on"
                     @click.stop="miniVariant = !miniVariant"
              >
                <v-icon>fas fa-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
              </v-btn>
            </template>
            <span>Mini Drawer</span>
          </v-tooltip>
          <!-- App Bar Maximize -->
          <v-tooltip v-if="hover" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon
                     v-bind="attrs"
                     v-on="on"
                     @click.stop="clipped = !clipped"
              >
                <v-icon>fas fa-{{ `window-${clipped ? 'minimize' : 'maximize'}` }}</v-icon>
              </v-btn>
            </template>
            <span v-if="!clipped">Maximize</span>
            <span v-else>Minimize</span>
          </v-tooltip>
        </v-sheet>
      </v-hover>

      <!--      Back Button-->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            @click="goBack"
            v-on="on"
          >
            <v-icon>fas fa-arrow-left</v-icon>
          </v-btn>
        </template>
        <span>Back</span>
      </v-tooltip>

      <!--      Forward Button-->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            @click="goForward"
            v-on="on"
          >
            <v-icon>fas fa-arrow-right</v-icon>
          </v-btn>
        </template>
        <span>Forward</span>
      </v-tooltip>

      <!--      Refresh Button-->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            @click="refresh"
            v-on="on"
          >
            <v-icon>fas fa-redo</v-icon>
          </v-btn>
        </template>
        <span>Refresh</span>
      </v-tooltip>
      <v-spacer/>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn :loading="isSyncingResources" icon
                 v-bind="attrs" @click="syncResources" v-on="on">
            <v-icon>fas fa-sync-alt</v-icon>
          </v-btn>
        </template>
        <span>Sync Resources</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click.stop="rightDrawer = !rightDrawer"
          >
            <v-icon>fas fa-cogs</v-icon>
          </v-btn>
        </template>
        <span>Tools</span>
      </v-tooltip>
      <v-menu v-model="userMenuModal" :close-on-content-click="false" offset-overflow offset-y
              origin="center center"
              transition="slide-x-reverse-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>fas fa-user-circle</v-icon>
          </v-btn>
        </template>
        <v-expand-transition/>
        <v-container class="pa-0 ma-0" flat>
          <v-list class="pa-0 ma-0" dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="pa-0 ma-0"><img alt="bigyapan_logo" src="/images/logo_bigyapan.svg"/>
                </v-list-item-title>
                <v-list-item-subtitle><h4>{{ authenticatedUser.email }}</h4></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="pa-0 ma-0"></v-divider>
            <v-list-item @click="logout(), userMenuModal = !userMenuModal">
              <v-list-item-icon>
                <v-icon>fas fa-sign-out-alt</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-container>
      </v-menu>
    </v-app-bar>

    <!-- Admin Panel Body Container -->
    <v-main>
      <v-container
        fluid>
        <Nuxt/>
      </v-container>
    </v-main>

    <!-- Right Navigation Drawer -->
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      fixed
      temporary
    >
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>
              {{ themeSwitch ? 'fas fa-moon' : 'fas fa-sun' }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch Theme</v-list-item-title>
          <v-switch
            v-model="themeSwitch"
          ></v-switch>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>
              fas fa-language
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Locale
          </v-list-item-title>
          <v-autocomplete
            v-model="locale"
            :items="availableLocales"
            item-text="name"
            item-value="code"
            return-object
            @input="changeLocale">
          </v-autocomplete>


        </v-list-item>
        <v-list-item :to="localePath('/settings')">
          <v-list-item-action>
            <v-icon>
              fas fa-cog
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item :to="localePath('/oauth2')">
          <v-list-item-action>
            <v-icon>
              fas fa-fingerprint
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>OAuth2</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <!--Notification-->
    <NotificationList/>

    <!--Confirm Dialog-->
    <ConfirmDialog ref="confirm"/>
  </v-app>
</template>

<i18n>
{
  "en": {
    "navigationMenuText": {
      "dashboard": "Dashboard",
      "users": "Users",
      "accountTypes": "Account Types",
      "itemCategories": "Item Categories",
      "itemSubCategories": "Item Sub Categories"
    }
  },
  "np": {
    "navigationMenuText": {
      "dashboard": "ड्यासबाेर्ड",
      "users": "प्रयोगकर्ताहरु",
      "accountTypes": "खाता प्रकारहरु",
      "itemCategories": "सामाग्री बर्गिकरणहरू",
      "itemSubCategories": "सामाग्रीका थप बर्गिकरणहरू "
    }
  }
}
</i18n>

<script>
import NotificationList from "../components/notification/NotificationList";
import ConfirmDialog from "../components/ConfirmDialog";
import {mapGetters} from "vuex";

export default {
  name: "default",
  components: {
    ConfirmDialog,
    NotificationList
  },
  data() {
    return {
      locale: this.$i18n.locale,
      userMenuModal: false,
      themeSwitch: false,
      drawer: true,
      items: [
        {
          icon: 'fas fa-tachometer-alt',
          title: "navigationMenuText.dashboard",
          to: '/'
        },
        {
          icon: 'fas fa-user',
          title: "navigationMenuText.users",
          to: '/users'
        },
        {
          icon: 'fas fa-id-card',
          title: "navigationMenuText.accountTypes",
          to: '/account-types'
        },
        {
          icon: 'fas fa-sitemap',
          title: "navigationMenuText.itemCategories",
          to: '/item-categories'
        },
        {
          icon: 'fas fa-sitemap',
          title: "navigationMenuText.itemSubCategories",
          to: '/item-sub-categories'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      clipped: true,
    }
  },
  watch: {
    themeSwitch: function (old, newVal) {
      this.$vuetify.theme.dark = old;
    },

  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
    refresh() {
      this.$router.go(0);
    },
    logout() {
      let temp = this;
      this.$store
        .dispatch("auth/logout")
        .then(function (response) {
          if (response.status === 200) {
            temp.$router.push("/login");
          }
          temp.$store.dispatch("notification/addNotification", {
            type: response.data.type,
            message: response.data.message,
          }, {root: true});
        }).catch(function (error) {
        temp.$store.dispatch("notification/addNotification", {
          type: "error",
          message: error.message,
        }, {root: true});
        console.log(error)
      });
    },
    changeLocale(item) {
      this.$i18n.setLocale(item.code);
    },
    syncResources() {
      this.$store.dispatch("webservice/syncResources");
    }
  },
  mounted() {
    /* Change theme on the basis of system theme and change the website theme on change of system themes.
    if (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.themeSwitch = true;
    }
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        if (event.matches) {
          //dark mode
          this.themeSwitch = true;
        } else {
          //light mode
          this.themeSwitch = false;
        }
      })*/
    this.$root.confirm = this.$refs.confirm.open;
  },
  computed: {
    ...mapGetters({
      authenticatedUser: 'auth/GET_USER',
      isSyncingResources: 'webservice/isSyncingResources',

    }),
    availableLocales() {
      return this.$i18n.locales;
    }
  }
}
</script>

<style lang="scss">
@import '/assets/variables.scss';

.v-data-table .v-data-footer {
  border-top: none !important;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #9e9e9e;
}

</style>
