<script lang="ts">
	import WeekSelector from '$lib/components/WeekSelector.svelte';
	import { page } from '$app/state';
	let { children } = $props();
	const active = $derived(() => {
		const params = page.url.searchParams;
		return Number(params.get('active') ?? 0);
	});
</script>

<header class="border-b border-gray-200 bg-gray-50">
	<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<div class="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
			<div>
				<h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Anime Page</h1>
			</div>

			<div class="flex items-center gap-4">
				<nav class="flex items-center justify-center p-6 lg:px-8" aria-label="Global">
					<WeekSelector active={active()}></WeekSelector>
				</nav>
			</div>
		</div>
	</div>
</header>

{@render children()}
