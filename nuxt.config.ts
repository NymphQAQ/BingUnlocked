// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    devServer: {
        host: '0.0.0.0',
        port: 8848
    },
    modules: [
        '@nuxtjs/tailwindcss',
    ]

})
