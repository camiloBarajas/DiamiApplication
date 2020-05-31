import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { ConstantsService } from '../utils/constants.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanLoad {
  constructor(private storage: Storage, private navCtrl: NavController) {}

  async canLoad() {
    const user = await this.storage.get(ConstantsService.USER);
    if (user.role === 'PROFESSIONAL') {
      this.navCtrl.navigateRoot(environment.routes.tabsRequests);
      return false;
    }

    return true;
  }
}
