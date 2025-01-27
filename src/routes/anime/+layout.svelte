<script lang="ts">
	import WeekSelector from '$lib/components/WeekSelector.svelte';
	import { page } from '$app/state';
	import Badge from '$lib/components/Badge.svelte';
	import { Animes } from '$lib/db/animes.svelte';
	import { toggle, filters } from '$lib/store/filter.store.svelte';
	let { children } = $props();
	const active = $derived(() => {
		const params = page.url.searchParams;
		return Number(params.get('active') ?? 0);
	});
	let totalFavs = $state(0);
	$effect(() => {
		const cursor = Animes.find();
		totalFavs = cursor.count();
		return () => {
			cursor.cleanup();
		};
	});
	const favsMessage = $derived(`${totalFavs} ${filters.faved ? 'Filtering' : ''}`);
</script>

<header class="border-b border-gray-200 bg-gray-50">
	<div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
		<div class="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
			<div class="inline-flex gap-2">
				<h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Anime Page</h1>
				<Badge
					onclick={toggle}
					icon={'👍'}
					className={`text-base rounded-full my-auto ${filters.faved ? 'border-4 border-purple-800' : ''}`}
					>{favsMessage}</Badge
				>
			</div>

			<div class="flex items-center gap-4">
				<nav class="flex items-center justify-center p-6 lg:px-8 max-w-[90vw]" aria-label="Global">
					<WeekSelector active={active()}></WeekSelector>
				</nav>
			</div>
		</div>
	</div>
</header>

{@render children()}
