import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { WikiEntry } from '../../model/wikiEntry';

/**
 * Generated class for the PlaceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'entry',
  templateUrl: 'entry.html'
})
export class EntryComponent {

  public entry: WikiEntry;

  constructor(private viewCtrl: ViewController, private params: NavParams) {
    this.entry = params.data.entry;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
