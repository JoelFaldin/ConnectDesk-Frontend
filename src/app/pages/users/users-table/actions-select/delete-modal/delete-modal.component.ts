import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '@services/user.service';

@Component({
  selector: 'delete-modal',
  imports: [ToastModule, ConfirmDialogModule, ButtonModule, MatIconModule],
  templateUrl: './delete-modal.component.html',
})
export class DeleteModalComponent {
  userService = inject(UserService);

  @Input() userRut: any;
  @Output() closeModal = new EventEmitter();

  handleDelete() {
    this.userService.deleteUser(this.userRut).subscribe(res => {
      console.log(res);
    });

    this.userService.removeUserFromArray(this.userRut);

    this.closeModal.emit();
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
