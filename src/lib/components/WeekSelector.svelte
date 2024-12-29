<script lang="ts">
	const { active } = $props<{ active: number }>();
	const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  
</script>

<div class="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
	{#each weekDays as day, i}
		<a
			href="?active={today > i ? (today - i) * -1 : i - today}"
			class={{
				'inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative': true,
				'bg-white': today + active === i
			}}
		>
			{day}
		</a>
	{/each}
</div>
