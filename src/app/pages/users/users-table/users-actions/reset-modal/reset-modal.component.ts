import { ButtonModule } from 'primeng/button';

import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '@services/user.service';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'reset-modal',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './reset-modal.component.html',
})
export class ResetModalComponent implements OnInit {
  userService = inject(UserService);

  @Input() userRut: any;
  user: User | undefined;

  form = new FormGroup({
    newPassword: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.userService.getSingleUser(this.userRut).subscribe(user => {
      this.user = user;
    })
  }

  handleResetPassword() {
    console.log('aaa');
    console.log(this.form.value)
  }
}
