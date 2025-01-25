<script lang="ts">
	const { active } = $props<{ active: number }>();
	const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const today = new Date().getDay();
</script>

<div
	class="inline-flex flex-wrap justify-center rounded-lg border border-gray-100 bg-gray-100 p-1 outline-2 outline-purple-700"
>
	{#each weekDays as day, i}
		<a
			href="?active={today > i ? (today - i) * -1 : i - today}"
			class={{
				'inline-block rounded-md px-4 py-2 text-sm font-bold text-gray-700 hover:text-gray-700 focus:relative': true,
				'bg-purple-200': today + active === i
			}}
		>
			{day}
		</a>
	{/each}
</div>
