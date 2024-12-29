<script lang="ts">
	import type { Anime } from '$lib/models/anime-schedule';

	let { anime }: { anime: Anime } = $props();
</script>

<div
	class="sahdow-lg flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-100"
>
	<div>
		<img class="h-auto w-full object-cover object-center" alt="" src={anime.images.jpg.image_url} />
	</div>
	<div class="py-8 text-center sm:py-6">
		<p class="mb-2 text-xl font-bold text-gray-700">
			<a target="_blank" href={anime.url}>{anime.title}</a>
		</p>
	</div>
</div>
