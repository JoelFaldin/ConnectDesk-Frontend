import { ButtonModule } from 'primeng/button';

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  })

  handleResetPassword() {
    console.log('aaa');
    console.log(this.form.value)
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
