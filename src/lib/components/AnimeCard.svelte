<script lang="ts">
	import type { Anime } from '$lib/models/anime-schedule';
	import Badge from '$lib/components/Badge.svelte';
	import { fade } from 'svelte/transition';
	let { anime, delay = 10 }: { anime: Anime; delay: number } = $props();
</script>

<div
	in:fade={{ duration: 200, delay }}
	class="sahdow-lg row-span-4 grid grid-rows-subgrid overflow-hidden rounded-lg bg-gray-100 "
>
	<div class="row-span-2 flex bg-gray-300 max-h-100 lg:max-h-[25vh] xl:max-h-[30vh] 2xl:max-h-[40vh]">
		<img
			class="h-auto w-full object-contain object-center"
			alt=""
			src={anime.images.jpg.image_url}
		/>
	</div>
	<div class="row-span-1 py-8 text-center sm:py-6">
		<p class="mb-2 text-xl font-bold text-gray-700">
			<a target="_blank" href={anime.url}>{anime.title}</a>
		</p>
	</div>
	<div class="row-span-1">
		<Badge className="float-right me-2 mb-2">{anime.episodes ?? '?'}</Badge>
	</div>
</div>
