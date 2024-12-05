// vite.config.js
import tailwindcss from "tailwindcss"

export default {
    // config options
	server: {
		port: 38360,
	},
	css: {
		postcss : {
			plugins: [tailwindcss()],
		},
	}
}
