import { ButtonModule } from 'primeng/button';

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { UserService } from '@services/user.service';

@Component({
  selector: 'edit-modal',
  imports: [ButtonModule],
  templateUrl: './edit-modal.component.html',
})
export class EditModalComponent {
  userService = inject(UserService);
  @Input() userRut: string = '';
  @Output() closeModal = new EventEmitter();

  ngOnInit() {
    this.userService.getSingleUser(this.userRut).subscribe(user => {
      console.log(user)
    });
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
