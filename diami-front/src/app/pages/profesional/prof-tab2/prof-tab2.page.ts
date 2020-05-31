import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prof-tab2',
  templateUrl: './prof-tab2.page.html',
  styleUrls: ['./prof-tab2.page.scss']
})
export class ProfTab2Page implements OnInit {
  user: any;
  descriptionHistorial: string;

  constructor() {
    this.descriptionHistorial =
      'Eres una excelente psicóloga, nos da gusto que formes parte de nosotros, aquí puedes consultar tu historial';
  }

  ngOnInit() {
    this.user = {
      id: '54a8sdae7aca2s31asd',
      name: 'Jefersson Gálvez',
      email: 'jhegalvez11@gmail.com',
      img: '',
      phone: '',
      edad: 26,
      situation: 'Riesgo medio'
    };
  }
}
