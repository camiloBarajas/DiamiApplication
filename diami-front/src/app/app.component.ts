import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });

    this.auth.authState.subscribe(async (state) => {
      if (state) {
        const role = await this.auth.getUser();
        if (role.role === 'PROFESSIONAL') {
          this.router.navigate([environment.routes.tabsRequests]);
        } else {
          this.router.navigate([environment.routes.tabsHome]);
        }
      } else {
        this.router.navigate([environment.routes.welcome]);
      }
    });
  }
}
