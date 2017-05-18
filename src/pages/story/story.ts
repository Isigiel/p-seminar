import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs/Observable';
import { Place } from '../../model/place';
import { PlaceComponent } from '../../components/place/place';

/**
 * Generated class for the StoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-story',
  templateUrl: 'story.html',
})
export class StoryPage {

  public $places: Observable<Place[]>;

  constructor(private modalCtrl: ModalController, private data: DataService) {
    this.$places = data.places;
  }

  visitPlace(place) {
    const placeModal = this.modalCtrl.create(PlaceComponent, {place});
    placeModal.present().then((placeVisited => {
      if (placeVisited) {
        this.data.visit(place.id);
      }
    }));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoryPage');
  }

}
