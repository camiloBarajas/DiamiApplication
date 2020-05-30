import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-slide3',
  templateUrl: './slide3.component.html',
  styleUrls: ['./slide3.component.scss']
})
export class Slide3Component implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  navigate() {
    this.navCtrl.navigateForward('/login');
  }
}
