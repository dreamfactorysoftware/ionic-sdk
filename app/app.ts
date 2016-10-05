import {provide, Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {GroupListCmp} from './pages/group/group-list';
import {ContactListCmp} from './pages/contact-list/contact-list';
import {HTTP_PROVIDERS, Http, RequestOptions} from '@angular/http';
import {DfRequestOptions} from './config/interceptors';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GroupListCmp;
  pages: Array<{ title: string, component: any }>;

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Groups', component: GroupListCmp },
      { title: 'Contact List', component: ContactListCmp}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.push(page.component);
  }
}

ionicBootstrap(MyApp, [
  HTTP_PROVIDERS,
  provide(RequestOptions, { useClass: DfRequestOptions }),
  provide(Window, { useValue: window })
]);
