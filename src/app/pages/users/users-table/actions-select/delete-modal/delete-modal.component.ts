import { Component, Input } from '@angular/core';

@Component({
  selector: 'delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
})
export class DeleteModalComponent {
  @Input() userRut: any;
}
