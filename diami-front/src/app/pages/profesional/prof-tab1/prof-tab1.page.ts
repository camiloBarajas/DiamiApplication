import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prof-tab1',
  templateUrl: './prof-tab1.page.html',
  styleUrls: ['./prof-tab1.page.scss']
})
export class ProfTab1Page implements OnInit {
  user: any;
  description: string;

  constructor() {
    this.description = 'Hola diana estas son tus solicitudes';
  }

  ngOnInit() {
    this.user = {
      id: '54a8sdae7aca2s31asd',
      name: 'Jefersson Gálvez',
      email: 'jhegalvez11@gmail.com',
      img: '',
      phone: '',
      edad: 26,
      situation: 'Riesgo medio',
      process: 'NEW'
    };
  }
}
