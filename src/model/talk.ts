import { Question } from './question';
/**
 * Created by hedde on 18/05/2017.
 */

export interface Talk {
  title: string;
  start: string[];
  questions: Question[];
}
