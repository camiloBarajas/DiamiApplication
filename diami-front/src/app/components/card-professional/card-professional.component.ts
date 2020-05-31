import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-professional',
  templateUrl: './card-professional.component.html',
  styleUrls: ['./card-professional.component.scss']
})
export class CardProfessionalComponent implements OnInit {
  @Input() user: any;
  @Input() icon: string;

  constructor() {}

  ngOnInit() {}
}
