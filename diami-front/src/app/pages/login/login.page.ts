import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonContent, NavController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { ConstantsService } from 'src/app/utils/constants.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  message = '';
  messages = [];
  currentUser: string;
  // @ViewChild('scrollElement', { static: false }) content: IonContent;
  @ViewChild(IonContent) content: IonContent;
  container: HTMLElement;

  constructor(
    private socket: Socket,
    private storage: Storage,
    private auth: AuthService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    const messages =
      (await this.storage.get(ConstantsService.CHAT_LOGIN)) || [];
    this.messages.push(...messages);
    this.socketConnection();
    this.scrollBottom();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async socketConnection() {
    this.socket.connect();

    this.currentUser = await this.auth.getUser();
    this.socket.emit('init-chat-login', this.currentUser);

    this.socket.fromEvent('message-login').subscribe((data: any) => {
      this.messages.push(data);
      this.scrollBottom();
    });
  }

  sendMessage() {
    this.socket.emit('send-message-login', {
      text: this.message,
      user: this.currentUser
    });

    this.messages.push({
      createdAt: new Date(),
      message: this.message,
      type: 'USER'
    });
    this.message = '';
    this.scrollBottom();
  }

  ionViewWillLeave() {
    this.socket.disconnect();
    this.storage.set(ConstantsService.CHAT_LOGIN, this.messages);
  }

  scrollBottom() {
    if (this.content.scrollToBottom) {
      setTimeout(() => {
        this.content.scrollToBottom();
      });
    }
  }

  async login() {
    await this.auth.login(this.messages);
  }
}
