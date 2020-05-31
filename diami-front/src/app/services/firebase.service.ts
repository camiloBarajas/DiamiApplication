import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private toast: HTMLIonToastElement;
  user: any;

  constructor(
    private fcm: FCM,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private news: NewsService,
    private auth: AuthService
  ) {}

  async getToken() {
    this.user = await this.auth.getUser();
    this.fcm
      .getToken()
      .then((token) => {
        if (this.user.tokenFirebase !== token) {
          this.auth.updateTokenFirebase(this.user.id, token).subscribe();
        }
      })
      .catch(() => console.log('error obteniendo token firebase'));
  }

  onNotification() {
    this.fcm.onNotification().subscribe((data) => {
      console.log(data);
      this.presentToast('Tienes una nueva notificación');
    });
  }

  async presentToast(msj: string) {
    this.toast = await this.toastCtrl.create({
      animated: true,
      duration: 3000,
      keyboardClose: false,
      mode: 'ios',
      position: 'top',
      message: msj,
      buttons: [
        {
          side: 'end',
          icon: 'eye',
          text: 'VER',
          handler: () => {
            this.news.getNotificationsDB(this.user).subscribe(
              (response: any) => {
                if (response.ok) {
                }
                console.log(response);

                this.navCtrl.navigateRoot(environment.routes.tabsRequests, {
                  animated: true
                });
              },
              (err) => console.log(err)
            );
          }
        }
      ]
    });

    this.toast.present();
  }
}
