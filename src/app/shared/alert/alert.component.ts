import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() message!: string;
  @Output() close = new EventEmitter();

  onClose(event: Event) {
    this.close.emit(event);
  }
}
