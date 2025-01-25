<script lang="ts">
	import type { Anime } from '$lib/models/anime-schedule';
	import Badge from '$lib/components/Badge.svelte';
	import { fade } from 'svelte/transition';
	import Button from './Button.svelte';
	import { toggle } from '$lib/db/animes.svelte';
	let { anime, delay = 10, fav }: { fav: boolean; anime: Anime; delay: number } = $props();
</script>

<div
	in:fade={{ duration: 200, delay }}
	class={[
		'sahdow-lg row-span-4 grid grid-rows-subgrid overflow-hidden rounded-lg bg-gray-100 ',
		fav ? 'border-t-8 border-purple-700' : ''
	]}
>
	<div class="max-h-100 row-span-2 flex bg-gray-300 lg:max-h-[25h] xl:max-h-[30vh] 2xl:max-h-[40vh]">
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
		<div class="flex justify-between">
			<Button onclick={() => toggle(anime)} className="rounded-se-xl rounded-es-xl ">👍</Button>
			<Badge
				className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl px-3 py-1.5"
				>{anime.episodes ?? '?'}</Badge
			>
		</div>
	</div>
</div>
