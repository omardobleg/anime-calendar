import { getContext, setContext } from 'svelte';

const FILTER_KEY = 'filter-anime';
const getInitialValue = () => {
	const stored = localStorage.getItem(FILTER_KEY);
	return stored ? JSON.parse(stored) : stored;
};
export type Filters = {
	faved: boolean;
};

class FiltersState {
	#filters = $state(getInitialValue() ?? { faved: false }) as Filters;
	get faved() {
		return this.#filters.faved;
	}
	toggle = () => {
		this.#filters.faved = !this.#filters.faved;
		localStorage.setItem(FILTER_KEY, JSON.stringify(this.#filters));
	};
}

export function getFiltersContext() {
	return getContext<ReturnType<typeof setFiltersContext>>(FILTER_KEY);
}

export function setFiltersContext() {
	return setContext(FILTER_KEY, new FiltersState());
}
