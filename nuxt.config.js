require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - bigyapan-admin',
    title: 'bigyapan-admin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~plugins/persistedState.js', ssr: false},

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/i18n',
    ['cookie-universal-nuxt', {alias: 'cookiz'}],
    'nuxt-webfontloader',
  ],


  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    },
    locales: [{
      code: 'en',
      iso: 'en-US',
      file: 'en',
      name: 'EN'
    }, {
      code: 'np',
      iso: 'np-NP',
      file: 'np',
      name: 'NP'
    }],
    vueI18nLoader: true,
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales/',
    vueI18n: {
      fallbackLocale: 'en'
    },
  },
  axios: {},
  fontawesome: {

  },
  router: {middleware: ['routeNavigationGuard']},

  webfontloader: {
    custom: {
      families: [
        'Open Sans',
        'Roboto',
        'Nunito',
      ],
      urls: [
        // for each Google Fonts add url + options you want
        // here add font-display option
        'https://fonts.googleapis.com/css?family=Open+Sans&display=swap',
        'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap',
        'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap'
      ]
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {icons: 'fa'},
    treeShake: true,
    options: {
      customProperties: true
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: {
            base: "#307EB7",
            lighten1: "#458BBE",
            lighten2: "#5998C5",
            lighten3: "#6EA5CD",
            lighten4: "#83B2D4",
            lighten5: "#98BFDB",
            lighten6: "#ACCBE2",
            lighten7: "#C1D8E9",
            lighten8: "#D6E5F1",
            lighten9: "#EAF2F8",

          },
          secondary: {
            base: "#FB8C00",
            lighten1: "#FB981A",
            lighten2: "#FCA333",
            lighten3: "#FCAF4D",
            lighten4: "#FDBA66",
            lighten5: "#FDC680",
            lighten6: "#FDD199",
            lighten7: "#FEDDB3",
            lighten8: "#FEE8CC",
            lighten9: "#FFF4E6",

          },
          accent: "#E63946",
          background: "#d3e1e8",
          text: "#212121",
          info: "#009688",
          warning: "#FB8C00",
          error: "#db3a30",
          success: "#429545",
        },
        dark: {
          primary: {
            base: "#307EB7",
            darken1: "#2B71A5",
            darken2: "#266592",
            darken3: "#225880",
            darken4: "#1D4C6E",
            darken5: "#183F5C",
            darken6: "#133249",
            darken7: "#0E2637",
            darken8: "#0A1925",
            darken9: "#050D12",
          },
          secondary: {
            base: "#FB8C00",
            darken1: "#E27E00",
            darken2: "#C97000",
            darken3: "#B06200",
            darken4: "#975400",
            darken5: "#7E4600",
            darken6: "#643800",
            darken7: "#4B2A00",
            darken8: "#321C00",
            darken9: "#190E00",
          },
          accent: "#E63946",
          background: "#2a3b49",
          text: "#212121",
          info: "#009688",
          warning: "#FB8C00",
          error: "#db3a30",
          success: "#429545",
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
