import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-diami',
  templateUrl: 'diami.page.html',
  styleUrls: ['diami.page.scss']
})
export class DiamiPage {
  diamiName: string;
  options: string[];
  modal: HTMLIonModalElement;

  constructor(private modalCtrl: ModalController) {
    this.options = ['Comida', 'Dormir', 'Bañar'];
  }

  selectOption(option: string) {}

  async openChat() {
    this.modal = await this.modalCtrl.create({
      animated: true,
      backdropDismiss: true,
      cssClass: 'modal_chat',
      keyboardClose: true,
      showBackdrop: true,
      swipeToClose: true,
      component: ChatComponent
    });

    this.modal.present();
  }
}
