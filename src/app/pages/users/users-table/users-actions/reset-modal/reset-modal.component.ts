import { ButtonModule } from 'primeng/button';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { UserService } from '@services/user.service';

@Component({
  selector: 'reset-modal',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './reset-modal.component.html',
})
export class ResetModalComponent {
  userService = inject(UserService);

  @Input() userRut: any;
  @Output() closeModal = new EventEmitter();

  form = new FormGroup({
    newPassword: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
    sendEmail: new FormControl(false, Validators.required),
  })

  handleResetPassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }



  }

  handleCloseModal() {
    this.closeModal.emit();
  }

  get newPassword() {
    return this.form.get("newPassword");
  }

  get repeatPassword() {
    return this.form.get("repeatPassword")
  }
}
