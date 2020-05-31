import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-prof-tab2',
  templateUrl: './prof-tab2.page.html',
  styleUrls: ['./prof-tab2.page.scss']
})
export class ProfTab2Page implements OnInit {
  user: any;
  messages = [];
  descriptionHistorial: string;

  constructor(private auth: AuthService, private storage: Storage) {}

  async ngOnInit() {
    this.user = await this.auth.getUser();
    // this.messages = await this.storage.get('messages');
  }
}
