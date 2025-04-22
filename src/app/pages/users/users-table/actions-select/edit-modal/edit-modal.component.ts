import { ButtonModule } from 'primeng/button';

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { UserService } from '@services/user.service';
import { User } from '@interfaces/user.interface';

@Component({
  selector: 'edit-modal',
  imports: [ButtonModule],
  templateUrl: './edit-modal.component.html',
})
export class EditModalComponent {
  userService = inject(UserService);
  @Input() userRut: string = '';
  @Output() closeModal = new EventEmitter();

  user: User | undefined;

  ngOnInit() {
    this.userService.getSingleUser(this.userRut).subscribe(user => {
      this.user = user;
    });
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
