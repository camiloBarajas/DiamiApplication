import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NewsService } from 'src/app/services/news.service';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-prof-tab1',
  templateUrl: './prof-tab1.page.html',
  styleUrls: ['./prof-tab1.page.scss']
})
export class ProfTab1Page implements OnInit {
  user: any;
  description: string;
  messages = [];

  constructor(
    private firebase: FirebaseService,
    private news: NewsService,
    private auth: AuthService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.user = await this.auth.getUser();
    this.firebase.getToken();
    this.getNews();
  }

  getNews() {
    this.news.getNotificationsDB(this.user._id).subscribe(
      (response: any) => {
        if (response.ok) {
          this.messages = response.data;
          this.storage.set('messages', this.messages);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
