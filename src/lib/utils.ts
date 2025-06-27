const DAY_IN_MS = 86400000;
export function getWeekNumber(d: Date) {
	const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
	// Get first day of year
	const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
	// Calculate full weeks to nearest Thursday
	const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / DAY_IN_MS + 1) / 7);
	// Return array of year and week number
	return [d.getUTCFullYear(), weekNo];
}
