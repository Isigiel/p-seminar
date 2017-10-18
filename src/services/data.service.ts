import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Geofence} from '@ionic-native/geofence';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Place} from '../model/place';
import {Story} from '../model/story';
import {WikiEntry} from '../model/wikiEntry';

/**
 * Created by hedde on 18/05/2017.
 */

@Injectable()
export class DataService {

  private $places: BehaviorSubject<Place[]>;
  private $fences: BehaviorSubject<{ [id: number]: boolean }>;
  private $wiki: BehaviorSubject<WikiEntry[]>;
  private story: Story;
  private progress: { unlocked: number[]; finished: number[]; wiki: WikiEntry[] };
  private loaded: Promise<any>;

  constructor(private storage: Storage, private http: Http, private geofence: Geofence) {
    this.$places = new BehaviorSubject([]);
    this.$wiki = new BehaviorSubject([]);
    this.$fences = new BehaviorSubject({});
    this.loaded = new Promise(resolve => {
      this.http.get('/assets/data/story.json')
        .map(res => res.json())
        .subscribe(data => {
          this.story = data;
          console.log('story data set', this.story);
          this.storage.get('progress').then(data => {
            if (data != null) {
              this.progress = JSON.parse(data);
            } else {
              this.progress = {
                unlocked: [0],
                finished: [],
                wiki:     [],
              };
            }
            this.$places.next(this.progress.unlocked.map(place => this.story.nodes[place]));
            this.$wiki.next(this.progress.wiki);
            resolve();
          });
        });
    });
    this.geofence.onTransitionReceived().subscribe(transitions => {
      transitions.forEach(transition => {
        if (transition.transitionType === 1) {
          this.$fences.next({...this.$fences.getValue(), [transition.id]: true});
        } else {
          this.$fences.next({...this.$fences.getValue(), [transition.id]: false});
        }
      });
    });
    this.loaded.then(() => {
      geofence.initialize().then(() => {
        this.addFences();

      }, err => console.error(err));
    });
  }

  get places() {
    return this.$places;
  }

  get wiki() {
    return this.$wiki;
  }

  atPlace(id: number) {
    return this.$fences.map(fences => fences[id]);
  }

  visit(id: number) {
    const placeIndex = this.story.nodes.findIndex(place => place.id == id);
    this.progress.unlocked.push(...this.story.nodes[placeIndex].unlocks
      .filter(id => !this.progress.unlocked.includes(id))
    );
    this.$places.next(this.progress.unlocked.map(place => this.story.nodes[place]));
    this.progress.wiki.push(...this.story.nodes[placeIndex].wiki);
    this.$wiki.next(this.progress.wiki);
    this.storage.set('progress', JSON.stringify(this.progress));
  }

  reset() {
    this.progress = {
      unlocked: [0],
      finished: [],
      wiki:     [],
    };
    this.$places.next(this.progress.unlocked.map(place => this.story.nodes[place]));
    this.$wiki.next(this.progress.wiki);
    this.storage.set('progress', JSON.stringify(this.progress));
  }

  private addFences() {
    console.log(this);
    const fences = this.story.nodes.map(place => {
      return {
        id:             place.id, //any unique ID
        latitude:       place.gps.lat, //center of geofence radius
        longitude:      place.gps.long,
        radius:         50, //radius to edge of geofence in meters
        transitionType: 3, //see 'Transition Types' below
        /*notification:   { //notification settings
          id:             1, //any unique ID
          title:          'You crossed a fence', //notification title
          text:           'You just arrived to Gliwice city center.', //notification body
          openAppOnClick: true //open app when notification is tapped
        },*/
      };
    });
    const status = {};
    fences.forEach(fence => {
      status[fence.id] = false;
    });
    this.$fences.next(status);
    this.geofence.addOrUpdate(fences).then(() => console.log('Added all fences'));
  }
}
