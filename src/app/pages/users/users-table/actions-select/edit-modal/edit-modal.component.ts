import { ButtonModule } from 'primeng/button';

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '@services/user.service';
import { User } from '@interfaces/user.interface';

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

  form = new FormGroup({
    names: new FormControl('', Validators.required),
    lastnames: new FormControl('', Validators.required),
    rut: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,2})\.?(\d{3})\.?(\d{3})\-([kK\d])$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    jobNumber: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    direction: new FormControl('', Validators.required),
  })

  ngOnInit() {
    this.userService.getSingleUser(this.userRut).subscribe(user => {
      this.user = user;
      this.form.patchValue({
        names: user?.names,
        lastnames: user?.lastNames,
        rut: user?.rut,
        email: user?.email,
        jobNumber: user?.jobNumber,
        contact: user?.contact,
        department: user?.departments,
        direction: user?.directions,
      })
    });


  }

  handleUpdateUser() {
    console.log('editing user!');
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
