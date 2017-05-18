import { WikiEntry } from './wikiEntry';
/**
 * Created by hedde on 18/05/2017.
 */
export interface Place {
  title: string;
  gps: string;
  unlocks: number[];
  talk?: number;
  wiki: WikiEntry[];
}
