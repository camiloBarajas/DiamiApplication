import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-prof-tab3',
  templateUrl: './prof-tab3.page.html',
  styleUrls: ['./prof-tab3.page.scss']
})
export class ProfTab3Page implements OnInit {
  user: any;
  options: number[];
  funtions: string[];
  messages = [];

  constructor(private auth: AuthService, private storage: Storage) {}

  selectOption(option: string) {}

  async ngOnInit() {
    this.user = await this.auth.getUser();
    this.messages = await this.storage.get('messages');
    this.countSol();
  }

  countSol() {
    this.options = [0, 0, this.messages.length];
  }

  logout() {
    this.auth.logout();
  }
}
