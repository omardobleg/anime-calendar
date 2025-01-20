import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			maxHeight: {
				'25': '25vh',
				'30': '30vh',
				'40': '40vh'
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
