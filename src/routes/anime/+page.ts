import { getAnimeData } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	const active = Number(url.searchParams.get('active') ?? 0);
	const date = new Date();
	date.setDate(date.getDate() + active);

	const response = await getAnimeData(fetch, date).map((anime) => ({
		data: [
			...anime.data
				.reduce((prev, curr) => {
					prev.set(curr.mal_id, curr);
					return prev;
				}, new Map())
				.values()
		]
	}));
	const data = response.match(
		(data) => ({
			animes: data.data
		}),
		(error) => ({
			error
		})
	);
	return data;
};
