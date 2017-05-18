import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Story } from '../model/story';
import { WikiEntry } from '../model/wikiEntry';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Place } from '../model/place';
/**
 * Created by hedde on 18/05/2017.
 */

@Injectable()
export class DataService {

  private $places: BehaviorSubject<Place[]>;
  private $wiki: BehaviorSubject<WikiEntry[]>;
  private story: Story;
  private progress: { unlocked: number[]; finished: number[]; wiki: WikiEntry[] };
  private loaded: Promise<any>;

  constructor(private storage: Storage, private http: Http) {
    this.$places = new BehaviorSubject([]);
    this.$wiki = new BehaviorSubject([]);
    this.loaded = new Promise(resolve => {
      this.storage.get('story').then(data => {
        if (data == null) {
          this.http.get('https://raw.githubusercontent.com/Isigiel/p-seminar/master/resources/data/story.json').map(
            res => res.json()).subscribe(data => {
            this.storage.set('story', JSON.stringify(data));
            this.story = data;
          });
        } else {
          this.story = JSON.parse(data);
        }
        this.storage.get('progress').then(data => {
          if (data != null) {
            this.progress = JSON.parse(data);
          } else {
            this.progress = {
              unlocked: [0],
              finished: [],
              wiki: []
            };
          }
          this.$places.next(this.progress.unlocked.map(place => this.story.nodes[place]));
          this.$wiki.next(this.progress.wiki);
          resolve();
        });
      });
    });
  }

  get places() {
    return this.$places;
  }

  get wiki() {
    return this.$wiki;
  }

  visit(id: number) {
    const placeIndex = this.story.nodes.findIndex(place => place.id == id);
    this.progress.unlocked.push(...this.story.nodes[placeIndex].unlocks);
    this.$places.next(this.progress.unlocked.map(place => this.story.nodes[place]));
    this.progress.wiki.push(...this.story.nodes[placeIndex].wiki);
    this.$wiki.next(this.progress.wiki);
    this.storage.set('progress', JSON.stringify(this.progress));
  }
}
