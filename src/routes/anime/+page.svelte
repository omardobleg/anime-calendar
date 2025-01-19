<script lang="ts">
	import AnimeCard from '$lib/components/AnimeCard.svelte';
	import type { ScheduleResponse } from '$lib/models/anime-schedule';
	const DELAY_STEP = 20;
	let { data }: { data: { animes: ScheduleResponse['data'] | null; error: Error | null } } =
		$props();
</script>

{#if data.animes}
	<section
		class="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-7"
	>
		{#each data.animes as anime, index (anime.title)}
			<AnimeCard delay={index * DELAY_STEP} {anime}></AnimeCard>
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
