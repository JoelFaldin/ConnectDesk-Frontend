import { ButtonModule } from 'primeng/button';

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '@services/user.service';
import { UpdateUser, User } from '@interfaces/user.interface';

@Component({
  selector: 'edit-modal',
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
})
export class EditModalComponent {
  userService = inject(UserService);
  @Input() userRut: string = '';
  @Output() closeModal = new EventEmitter();

  user: User | undefined;
  originalUser: Partial<User> = {};

  form = new FormGroup({
    names: new FormControl('', Validators.required),
    lastNames: new FormControl('', Validators.required),
    rut: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,2})\.?(\d{3})\.?(\d{3})\-([kK\d])$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    jobNumber: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    departments: new FormControl('', Validators.required),
    directions: new FormControl('', Validators.required),
  })

  ngOnInit() {
    this.userService.getSingleUser(this.userRut).subscribe(user => {
      this.user = user;
      this.originalUser = { ...user };

      this.form.patchValue({
        names: user?.names,
        lastNames: user?.lastnames,
        rut: user?.rut,
        email: user?.email,
        jobNumber: user?.jobNumber,
        contact: user?.contact,
        departments: user?.departments,
        directions: user?.directions,
      })
    });
  }

  handleUpdateUser() {
    const current = this.form.value;
    const updateFields: any = {};

    for (const key in current) {
      type UserForm = typeof this.form.value;

      const typedKey = key as keyof UserForm;

      if (current[typedKey] !== (this.originalUser as any)[typedKey]) {
        updateFields[typedKey] = current[typedKey];
      }
    }

    if (Object.keys(updateFields).length === 0) {
      console.log('No changes were made dude');
      return;
    }

    const fields: UpdateUser[] = [];

    Object.keys(updateFields).forEach(key => {
      fields.push({
        columnName: key,
        value: updateFields[key]
      })
    })

    this.userService.updateUser(this.originalUser.rut!, fields).subscribe(res => {
      console.log(res);
    });

    this.userService.updateUserArray(this.originalUser.rut!, updateFields);

    this.closeModal.emit();
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
