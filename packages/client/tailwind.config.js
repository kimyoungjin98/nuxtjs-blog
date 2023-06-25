/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{vue,js}',
		'./composables/**/*.{js,ts}',
		'./composables/*.{js,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./utils/**/*.{js,ts}',
		'./app.vue',
	],
	theme: {
		extend: {},
	},
	plugins: [],
}

