import pack from './package.json'
import { setAbsoluteSqliteDatabaseUrlForPrisma } from './prisma/utils'

setAbsoluteSqliteDatabaseUrlForPrisma()

export default defineNuxtConfig({
  lodash: {
    prefix: '_',
    prefixSkip: false
  },
  radash: {
    prefix: '-',
    prefixSkip: false
  },
  runtimeConfig: {
    version: pack.version
  },
  modules: [
    '@artmizu/nuxt-prometheus',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    'nuxt-directus',
    '@hebilicious/server-block-nuxt',
    '@hebilicious/sfc-server-volar',
    'nuxt-svgo', '@huntersofbook/naive-ui-nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/device',
    '@nuxtjs/fontaine',
    '@nuxtjs/html-validator',
    '@nuxtjs/html-validator',
    '@nuxtjs/web-vitals',
    '@nuxtus/nuxt-module',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-capo',
    'nuxt-gtag',
    'nuxt-icon',
    'nuxt-link-checker',
    'nuxt-lodash',
    'nuxt-og-image',
    'nuxt-radash',
    'nuxt-security',
    'nuxt-vitest'
  ],
  extends: ['@sidebase/core'],
  typescript: {
    shim: false
  },
  webVitals: {
    debug: true,
    provider: 'log',
    disabled: false
  }
})
