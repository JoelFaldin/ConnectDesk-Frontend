import { Component, Input } from '@angular/core';

@Component({
  selector: 'reset-modal',
  imports: [],
  templateUrl: './reset-modal.component.html',
})
export class ResetModalComponent {
  @Input() userRut: any;
}
