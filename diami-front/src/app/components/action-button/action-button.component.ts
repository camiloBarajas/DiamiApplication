import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {
  @Input() textButton: string;
  @Output() actionButton: EventEmitter<any>;

  constructor() {
    this.actionButton = new EventEmitter();
  }

  ngOnInit() {}

  selectButtonAction() {
    this.actionButton.emit();
  }
}
