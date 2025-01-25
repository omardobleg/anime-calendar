const FILTER_KEY = 'filter-anime';
const getInitialValue = () => {
	const stored = localStorage.getItem(FILTER_KEY);
	return stored ? JSON.parse(stored) : stored;
};
export type Filters = {
	faved: boolean;
};
export const filters = $state<Filters>(getInitialValue() ?? { faved: false });

export const toggle = () => {
	filters.faved = !filters.faved;
	localStorage.setItem(FILTER_KEY, JSON.stringify(filters));
};
