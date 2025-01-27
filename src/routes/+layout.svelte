<script lang="ts">
	import { setFiltersContext } from '$lib/store/filter.store.svelte';
	import '../app.css';
	setFiltersContext();
	let { children } = $props();
</script>

{@render children()}
