import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConstantsService } from '../utils/constants.service';
import { environment } from 'src/environments/environment';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Variables
  authState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private platform: Platform,
    private navCtrl: NavController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn(): void {
    this.storage.get(ConstantsService.TOKEN).then((response: string) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  logout(): void {
    this.storage.remove(ConstantsService.TOKEN);
    this.storage.remove(ConstantsService.USER);
    this.storage.remove(ConstantsService.CHAT);
    this.storage.remove(ConstantsService.CHAT_LOGIN);
    this.navCtrl.navigateRoot('', { animated: true });
    this.authState.next(false);
  }

  isAuthenticated(): boolean {
    return this.authState.value;
  }

  chatRegister() {
    this.navCtrl.navigateForward('/login', { animated: true });
  }

  login(infoUser: any[]) {
    this.storage.set(
      ConstantsService.TOKEN,
      'asd87gasd465g1asd5649a79846asd21g8a4sd9g478'
    );
    const user = {
      _id: '5ed144f78db3b9001714857e',
      name: 'Jefersson Gálvez',
      email: 'jhegalvez@gmail.com',
      role: 'USER',
      state: true
    };
    this.storage.set(ConstantsService.USER, user);
    this.authState.next(true);
    // Método login Back
    this.storage.remove(ConstantsService.CHAT_LOGIN);

    this.navCtrl.navigateRoot('/tabs/home', {
      animated: true
    });
  }

  async getUser(): Promise<any> {
    return await this.storage.get(ConstantsService.USER);
  }
}
