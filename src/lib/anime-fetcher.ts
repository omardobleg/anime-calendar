import type { ScheduleResponse } from './models/anime-schedule.ts';
import { ResultAsync } from 'neverthrow';
const BASE_URL = 'https://api.jikan.moe/v4/schedules';
enum WeekDays {
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday'
}
export const getAnimeData = (fetch: any, date: Date): ResultAsync<ScheduleResponse, Error> => {
	const params = new URLSearchParams({
		filter: WeekDays[date.getDay()]
	});
	console.log('DATE', date.getDay(), WeekDays[date.getDay()]);
	const animes = ResultAsync.fromPromise<Response, Error>(
		fetch(`${BASE_URL}?${params}`),
		() => new Error('Error fetching data from API')
	);
	return animes.map(
		(response: Response) => response.json() as unknown as Promise<ScheduleResponse>
	);
};

export type AnimeData = ReturnType<typeof getAnimeData>;
