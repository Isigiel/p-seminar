import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Place } from '../../model/place';

/**
 * Generated class for the PlaceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'place',
  templateUrl: 'place.html'
})
export class PlaceComponent {

  public place: Place;

  constructor(private viewCtrl: ViewController, private params: NavParams) {
    this.place = params.data.place;
  }

  dismiss() {
    this.viewCtrl.dismiss(false);
  }

  visitPlace() {
    this.viewCtrl.dismiss(true);
  }
}
