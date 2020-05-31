import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: any;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    this.user = await this.auth.getUser();
  }

  logout() {
    this.auth.logout();
  }
}
