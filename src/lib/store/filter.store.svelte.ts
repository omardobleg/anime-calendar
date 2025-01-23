const FILTER_KEY = 'filter-anime';
const getInitialValue = () => {
	const stored = localStorage.getItem(FILTER_KEY);
	return stored ? JSON.parse(stored) : stored;
};
type Filters = {
	faved: boolean;
};
export let filters = $state<Filters>(getInitialValue() ?? { faved: false });

export const toggle = () => {
	filters.faved = !filters.faved;
	localStorage.setItem(FILTER_KEY, JSON.stringify(filters));
};
