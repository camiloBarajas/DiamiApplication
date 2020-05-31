import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConstantsService } from '../utils/constants.service';
import { environment } from 'src/environments/environment';
import { Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { timeout, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Variables
  authState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform,
    private navCtrl: NavController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  private getHttpHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
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

  register(infoUser: any) {
    return this.http.post(`${environment.urlApi}/user`, infoUser, {
      headers: this.getHttpHeaders()
    });
  }

  login(infoUser: any) {
    return this.http.post(`${environment.urlApi}/user/login`, infoUser, {
      headers: this.getHttpHeaders()
    });
  }

  validateUser(data: any) {
    const { isLogin, email, name, gender, age } = data;
    data.password =
      data.password.length < 6 ? data.password.concat('000000') : data.password;
    if (isLogin) {
      const credentials = {
        email,
        password: data.password
      };
      return this.login(credentials);
    } else {
      const credentials = {
        name,
        email,
        password: data.password,
        gender,
        age
      };
      return this.register(credentials);
    }
  }

  navigateToPage(data: any) {
    if (data.ok) {
      this.storage.set(ConstantsService.TOKEN, data.token);
      this.storage.set(ConstantsService.USER, data.user);
      this.authState.next(true);
      if (data.user.role === 'PROFESSIONAL') {
        this.navCtrl.navigateRoot(environment.routes.tabsRequests, {
          animated: true
        });
      } else {
        this.navCtrl.navigateRoot(environment.routes.tabsHome, {
          animated: true
        });
      }
    } else {
      alert('Falló login' + data);
      return;
    }
  }

  updateTokenFirebase(userId: string, tokenFirebase: string) {
    return this.http.patch(
      `${environment.urlApi}/user/update/token`,
      {
        userId,
        tokenFirebase
      },
      { headers: this.getHttpHeaders() }
    );
  }

  async getUser(): Promise<any> {
    return await this.storage.get(ConstantsService.USER);
  }
}
