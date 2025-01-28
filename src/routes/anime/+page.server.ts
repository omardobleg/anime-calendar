import { getAnimeData } from '$lib';
import type { ScheduleResponse } from '$lib/models/anime-schedule';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch, setHeaders }) => {
	const active = Number(url.searchParams.get('active') ?? 0);
	const date = new Date();
	date.setDate(date.getDate() + active);

	const response = await getAnimeData(fetch, date).map((anime: ScheduleResponse) => ({
		data: [
			...anime?.data
				// sort alphabetically
				.sort((a, b) => (a.title > b.title ? 1 : -1))
				//remove duplicates
				.reduce((prev, curr) => {
					prev.set(curr.mal_id, curr);
					return prev;
				}, new Map())
				.values()
		]
	}));
	setHeaders({ 'cache-control': 'public, max-age=3600' });
	const data = response.match(
		(data) => ({
			animes: data.data
		}),
		(error: Error) => ({
			error
		})
	);
	return data;
};
