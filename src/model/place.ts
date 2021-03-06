import { WikiEntry } from './wikiEntry';
/**
 * Created by hedde on 18/05/2017.
 */
export interface Place {
  id: number;
  title: string;
  gps: {lat: number, long: number};
  unlocks: number[];
  talk?: number;
  wiki: WikiEntry[];
}
