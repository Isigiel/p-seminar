import {Component} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {DataService} from '../../services/data.service';

@Component({
  selector:    'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  public lat: number;
  public long: number;
  public time: number;
  public accuracy: number;

  constructor(private geo: Geolocation, private data: DataService) {
    geo.watchPosition().subscribe(location => {
      this.time = location.timestamp;
      this.long = location.coords.longitude;
      this.lat = location.coords.latitude;
      this.accuracy = location.coords.accuracy;
    });
  }

  resetApp() {
    this.data.reset();
  }

}
