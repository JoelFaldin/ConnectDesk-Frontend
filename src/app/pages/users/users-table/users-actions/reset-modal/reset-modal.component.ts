import { ButtonModule } from 'primeng/button';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';

import { ResetPasswordInterface } from '@interfaces/user.interface';
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'reset-modal',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './reset-modal.component.html',
})
export class ResetModalComponent {
  authService = inject(AuthService);
  toast = inject(ToastService);

  @Input() userRut: any;
  @Output() closeModal = new EventEmitter();

  passwordError = signal("");

  form = new FormGroup({
    newPassword: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
    sendEmail: new FormControl(false, Validators.required),
  })

  handleResetPassword() {
    this.passwordError.set("");

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newPassword = this.form.value.newPassword;
    const repeatPassword = this.form.value.repeatPassword;

    if (newPassword !== repeatPassword) {
      this.passwordError.set("Passwords do not match. Ensure both password fields are identical.");
      return;
    }

    const raw = this.form.getRawValue();

    const payload: ResetPasswordInterface = {
      newPassword: raw.newPassword!,
      sendEmail: raw.sendEmail!,
    }

    this.authService.resetPassword(this.userRut, payload).subscribe(res => {
      this.resetState();

      this.toast.success("Password updated!", "User password has been updated.");

      this.closeModal.emit();
    })
  }

  resetState() {
    this.form.reset({
      newPassword: '',
      repeatPassword: '',
      sendEmail: false,
    });

    this.passwordError.set("");
  }

  handleCloseModal() {
    this.resetState();

    this.closeModal.emit();
  }

  get newPassword() {
    return this.form.get("newPassword");
  }

  get repeatPassword() {
    return this.form.get("repeatPassword")
  }

  resetPasswordError() {
    this.passwordError.set("");
  }
}
