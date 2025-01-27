<script lang="ts">
	import AnimeCard from '$lib/components/AnimeCard.svelte';
	import { type Anime, type ScheduleResponse } from '$lib/models/anime-schedule';
	import { Animes } from '$lib/db/animes.svelte';

	const DELAY_STEP = 20;
	let { data }: { data: { animes: ScheduleResponse['data'] | null; error: Error | null } } =
		$props();
	let animes = $state.raw<Anime[]>([]);
	$effect(() => {
		const cursor = Animes.find({});
		animes = cursor.fetch();
		return () => {
			cursor.cleanup();
		};
	});
	const favIds = $derived(animes.map(({ mal_id }) => mal_id));
	const filteredAnimes = $derived(data.animes);
</script>

{#if filteredAnimes}
	<section
		class="grid gap-4 p-5 perspective-distant sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6"
	>
		{#each filteredAnimes as anime, index (anime.title)}
			<AnimeCard fav={favIds.includes(anime.mal_id)} delay={index * DELAY_STEP} {anime}></AnimeCard>
		{/each}
	</section>
{:else}
	<section class="m-3 flex justify-center">
		<div role="alert" class="w-3/4 rounded border-s-4 border-red-500 bg-red-50 p-4">
			<strong class="block font-medium text-red-800"> Something went wrong </strong>
			<p class="mt-2 text-sm text-red-700">
				{data.error?.message}
			</p>
		</div>
	</section>
{/if}
