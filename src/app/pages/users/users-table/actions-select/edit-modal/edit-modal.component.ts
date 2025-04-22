import { Component, inject, Input } from '@angular/core';

import { UserService } from '@services/user.service';

@Component({
  selector: 'edit-modal',
  imports: [],
  templateUrl: './edit-modal.component.html',
})
export class EditModalComponent {
  userService = inject(UserService);
  @Input() userRut: string = '';

  ngOnInit() {
    this.userService.getSingleUser(this.userRut).subscribe(user => {
      console.log(user)
    });
  }

}
