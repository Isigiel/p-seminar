import { Place } from './place';
import { Talk } from './talk';
/**
 * Created by hedde on 18/05/2017.
 */

export interface Story {
  nodes: Place[];
  talks: Talk[];
}
