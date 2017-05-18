import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { StoryPage } from '../story/story';
import { WikiPage } from '../wiki/wiki';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = StoryPage;
  tab2Root = WikiPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
