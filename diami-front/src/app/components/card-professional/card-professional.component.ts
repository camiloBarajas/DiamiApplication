import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCardComponent } from '../modal-card/modal-card.component';

@Component({
  selector: 'app-card-professional',
  templateUrl: './card-professional.component.html',
  styleUrls: ['./card-professional.component.scss']
})
export class CardProfessionalComponent implements OnInit {
  @Input() user: any;
  @Input() icon: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openModal(user: any) {
    const modal = await this.modalCtrl.create({
      component: ModalCardComponent,
      componentProps: {
        user
      },
      animated: true,
      mode: 'ios',
      cssClass: 'custom_user_modal'
    });

    modal.present();
  }
}
