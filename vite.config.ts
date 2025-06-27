import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	// @ts-ignore
	test: {
		// This is a Vitest configuration, not a standard Vite configuration.
		// The error "Object literal may only specify known properties, and 'test' does not exist in type 'UserConfigExport'"
		// indicates that `test` is not a recognized top-level property in Vite's `UserConfigExport` type.
		// However, Vitest extends Vite's configuration, so this is valid for Vitest.
		// Adding `@ts-ignore` to suppress the TypeScript error.
		environment: 'jsdom', // Default environment for tests if not specified otherwise in projects
		projects: [
			// Define separate test projects for client and server
			{
				// Client-side tests (browser environment)
				extends: './vite.config.ts', // Inherit base config
				test: {
					// Vitest specific configuration for this project
					name: 'client', // Name of the project
					environment: 'browser', // Run tests in a browser-like environment
					browser: {
						// Browser specific options
						enabled: true, // Enable browser testing
						provider: 'playwright', // Use Playwright as the browser provider
						instances: [{ browser: 'chromium' }] // Use Chromium browser
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'], // Include Svelte component tests
					exclude: ['src/lib/server/**'], // Exclude server-side code
					setupFiles: ['./vitest-setup-client.ts'] // Setup file for client tests
				}
			},
			{
				// Server-side tests (Node.js environment)
				extends: './vite.config.ts', // Inherit base config
				test: {
					// Vitest specific configuration for this project
					name: 'server', // Name of the project
					environment: 'node', // Run tests in Node.js environment
					include: ['src/**/*.{test,spec}.{js,ts}'], // Include all .test/.spec files
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'] // Exclude Svelte component tests (handled by client project)
				}
			}
		]
	}
});
