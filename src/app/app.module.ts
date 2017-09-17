import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { StoryPage } from '../pages/story/story';
import { WikiPage } from '../pages/wiki/wiki';
import { DataService } from '../services/data.service';
import { HttpModule } from '@angular/http';
import { PlaceComponent } from '../components/place/place';
import { EntryComponent } from '../components/entry/entry';
import {Geofence} from '@ionic-native/geofence';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    StoryPage,
    TabsPage,
    WikiPage,
    PlaceComponent,
    EntryComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    StoryPage,
    TabsPage,
    WikiPage,
    PlaceComponent,
    EntryComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Geofence,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
  ]
})
export class AppModule {
}
