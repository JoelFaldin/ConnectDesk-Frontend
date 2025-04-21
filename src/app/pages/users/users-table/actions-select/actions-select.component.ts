import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'actions-select',
  imports: [MenuModule, ButtonModule, MatIconModule],
  standalone: true,
  templateUrl: './actions-select.component.html',
})
export class ActionsSelectComponent {
  menuItems: MenuItem[] = [];
  @Input() user: any;

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.editUser(),
      },
      {
        label: 'Reset password',
        icon: 'pi-refresh',
        command: () => this.resetPassword(),
      }
    ]
  }

  editUser() {
    console.log('editing user!');
  }

  resetPassword() {
    console.log('resetting password!');
  }
}
