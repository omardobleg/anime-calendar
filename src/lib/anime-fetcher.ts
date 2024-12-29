import type { ScheduleResponse } from './models/anime-schedule';
import { getWeekNumber } from './utils';

const BASE_URL = 'https://api.jikan.moe/v4/schedules';
enum WeekDays {
	'sunday',
	'monday',
	'tuesday',
	'wednesay',
	'thursday',
	'friday',
	'saturday'
}
export const getAnimeData = async (
	fetch: Window['fetch'],
	date: Date
): Promise<ScheduleResponse> => {
	const params = new URLSearchParams({
		filter: WeekDays[date.getDay()]
	});

	const animes = await fetch(`${BASE_URL}?${params}`);
	const json = await animes.json();
	return json;
};
