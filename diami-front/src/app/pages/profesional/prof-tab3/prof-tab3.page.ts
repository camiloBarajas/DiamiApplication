import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-prof-tab3',
  templateUrl: './prof-tab3.page.html',
  styleUrls: ['./prof-tab3.page.scss']
})
export class ProfTab3Page implements OnInit {
  user: any;
  options: string[];
  funtions: string[];

  constructor(private auth: AuthService) {
    this.options = ['5', '3', '10'];
    this.funtions = ['Atendidos', 'En proceso', 'Solicitudes'];
  }

  selectOption(option: string) {}

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    this.user = await this.auth.getUser();
  }

  logout() {
    this.auth.logout();
  }
}
