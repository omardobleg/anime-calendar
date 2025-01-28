<script lang="ts">
	import WeekSelector from '$lib/components/WeekSelector.svelte';
	import { page } from '$app/state';
	import Badge from '$lib/components/Badge.svelte';
	import { Animes } from '$lib/db/animes.svelte';
	import { getFiltersContext } from '$lib/store/filter.store.svelte';
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
	const filters = getFiltersContext();
	const favsMessage = $derived(`${totalFavs} ${filters.faved ? 'Filtering' : ''}`);
</script>

<header
	class="sticky md:-top-16 z-1 flex md:h-32 -top-16 h-48 w-full items-center border-b border-gray-200 bg-gray-50 shadow-md"
>
	<div class="sticky top-0 md:h-16 h-32   mx-auto  max-w-screen-xl px-4 md:px-6 lg:px-8">
		<div class="flex flex-col items-start gap-1 md:gap-4 md:flex-row md:items-center md:justify-between">
			<div class="inline-flex gap-2 p-2 items-center">
				<h1 class="text-2xl md:text-lg lg:text-3xl font-bold text-gray-900 ">Anime Page</h1>
				<Badge
					onclick={filters.toggle}
					icon={'👍'}
					className={`text-base rounded-full my-auto ${filters.faved ? 'border-4 border-purple-800' : ''}`}
					>{favsMessage}</Badge
				>
			</div>

			<div class="flex items-center gap-4">
				<nav class="flex max-w-[90vw] items-center justify-center p-2 lg:px-8" aria-label="Global">
					<WeekSelector active={active()}></WeekSelector>
				</nav>
			</div>
		</div>
	</div>
</header>

{@render children()}
