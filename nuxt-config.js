const fs = require('fs-extra')

function myFunction (params) {
  let rts = []
  let words = fs.readJsonSync('./**.json')

  for (let [word, value] of Object.entries(words.english)) {
    rts.push(`/english/${word}`)
  }

  return  rts.slice(0, 100)
}

export default {
  mode: 'universal',
  env: {
    analyticsId: process.env.NODE_ENV === 'production' ? 'UA-**' : 'UA-**'
  },
  render: {
    resourceHints: false
  },
  router: {
    prefetchLinks: false
  },
  generate: {
    // fallback: false,
    subFolders: false,
    workers: 12,
    workerConcurrency: 500,
    concurrency: 500,
    routes (callback) {
      let rts = myFunction()
      // console.log(rts.length)
      callback(null, rts)
    },
    done ({ duration, errors, workerInfo }) {
      console.log('ok')
    },
    beforeWorkers (options) {
      delete options.generate.routes
      return options
    }
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  purgeCSS: {
    whitelist: ['bg-vue'],
  },
  loading: { color: '#fff' },
  css: [
  ],
  plugins: [
    '~/plugins/firebase',
    '~/plugins/jsonld',
    '~plugins/filters'
  ],
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/proxy'
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/amp',
    'nuxt-i18n'
  ],
  proxy: {
    '/api': {
      target: '**'
    }
  },
  i18n: {
    vueI18nLoader: true,
    detectBrowserLanguage: false,
    baseUrl: '**',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'english'
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'español'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'française'
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'русский'
      }
    ],
    defaultLocale: 'en',
    seo: true,
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome'
        },
        es: {
          welcome: 'Bienvenido'
        }
      }
    }
  },
  build: {
    extend (config, ctx) {
    }
  }
}
