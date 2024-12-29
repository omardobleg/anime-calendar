import type { PageLoad } from './$types';
import { getAnimeData } from '$lib';

export const load: PageLoad = async ({ url, fetch }) => {
	const active = Number(url.searchParams.get('active') ?? 0);
	const date = new Date();
	date.setDate(date.getDate() + active);
	return await getAnimeData(fetch, date);
};
