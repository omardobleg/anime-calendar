import { Collection } from '@signaldb/core';
import createLocalStorageAdapter from '@signaldb/localstorage';
import type { Anime } from '$lib/models/anime-schedule';
export const Animes = new Collection<Anime, string, Anime>({
	persistence: createLocalStorageAdapter('animes'),
	reactivity: {
		create() {
			let dep = $state(0);
			return {
				depend() {
					dep;
				},
				notify() {
					dep += 1;
				}
			};
		}
		//isInScope: () => !!$effect.tracking()
	}
});
export const toggle = (anime: Anime) => {
	const search = Animes.findOne({
		mal_id: anime.mal_id
	});
	if (search) {
		Animes.removeOne({ mal_id: anime.mal_id });
	} else {
		Animes.insert(anime);
	}
};
