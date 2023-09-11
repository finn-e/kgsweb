import pkg from './package.json'
import { setAbsoluteSqliteDatabaseUrlForPrisma } from './prisma/utils'

setAbsoluteSqliteDatabaseUrlForPrisma()

export default defineNuxtConfig({
  runtimeConfig: {
    version: pkg.version
  },
  modules: ['nuxt-svgo', '@huntersofbook/naive-ui-nuxt'],
  extends: ['@sidebase/core'],
  typescript: {
    shim: false
  }
})
