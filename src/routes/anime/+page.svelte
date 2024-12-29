<script lang="ts">
	import AnimeCard from '$lib/components/AnimeCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const animes = $derived(() => data.data);
</script>

<section class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 p-5">
	{#each animes() as anime}
		<AnimeCard {anime}></AnimeCard>
	{/each}
</section>
