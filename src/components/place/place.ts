import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {Place} from '../../model/place';
import {DataService} from '../../services/data.service';

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
  public atPlace: Observable<boolean>;

  constructor(private viewCtrl: ViewController, private params: NavParams, private data: DataService) {
    this.place = params.data.place;
    this.atPlace = this.data.atPlace(this.place.id);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  visitPlace() {
    this.viewCtrl.dismiss(true);
  }
}
