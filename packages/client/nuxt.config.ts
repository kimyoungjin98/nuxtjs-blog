// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	app: {
		head: {
			title: 'BLOG',
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],
			link: [],
			script: [],
		},
		pageTransition: { name: 'page', mode: 'out-in' },
	},

	runtimeConfig: {
		public: {
			server: process.env.SERVER_URL ?? 'http://localhost:4200',
		},
		server: process.env.SERVER_URL ?? 'http://localhost:4200',
	},

	css: ['~/assets/scss/global.scss'],
	modules: [
		'@pinia/nuxt',
		'@nuxtjs/tailwindcss',
		'nuxt-icon',
	],

})
