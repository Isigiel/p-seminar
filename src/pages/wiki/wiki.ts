import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { WikiEntry } from '../../model/wikiEntry';
import { DataService } from '../../services/data.service';
import { EntryComponent } from '../../components/entry/entry';

/**
 * Generated class for the WikiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-wiki',
  templateUrl: 'wiki.html',
})
export class WikiPage {
  public $entries: Observable<WikiEntry[]>;

  constructor(private data: DataService, private modalCtrl: ModalController) {
    this.$entries = data.wiki;
  }

  showEntry(entry) {
    const placeModal = this.modalCtrl.create(EntryComponent, {entry});
    placeModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WikiPage');
  }

}
