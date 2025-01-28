<script lang="ts">
	const { active } = $props<{ active: number }>();
	const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const today = new Date().getDay();
	let offset = $derived(`calc(((100% - .5rem) / 7 ) * (${today + active}) + .25rem`);
</script>

<div
	style="--left-offset: {offset}"
	class={[
		'relative inline-flex justify-center rounded-lg border border-gray-100 bg-gray-100 p-1 outline-2 outline-purple-700',
		'before:absolute before:top-1 before:bottom-1  before:h-[80%] before:rounded-lg before:bg-purple-200 before:p-1',
		'left-slider min-w-0 font-mono uppercase'
	]}
>
	{#each weekDays as day, i}
		<a
			href="?active={today > i ? (today - i) * -1 : i - today}"
			class={{
				' z-1 inline-block size-1/7 rounded-md bg-transparent px-4 py-2 text-sm font-bold text-gray-700 hover:text-gray-700 focus:relative': true
			}}
		>
			{day}
		</a>
	{/each}
</div>

<style>
	.left-slider::before {
		left: var(--left-offset);
		transition: left 0.3s;
		width: calc(1 / 7 * (100% - 0.5rem));
	}
	.left-slider > * {
		flex: 1 0 40px;
	}
</style>
