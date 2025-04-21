import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'actions-select',
  imports: [CommonModule, MenuModule, ButtonModule, MatIconModule],
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
        icon: 'edit',
        command: () => this.editUser(),
      },
      {
        label: 'Reset password',
        icon: 'refresh',
        command: () => this.resetPassword(),
      },
      {
        separator: true,
      },
      {
        label: 'Delete user',
        icon: 'delete',
        styleClass: 'text-red-500',
        style: { color: 'red' },
        command: () => this.deleteUser(),
      }
    ]
  }

  editUser() {
    console.log('editing user!');
  }

  resetPassword() {
    console.log('resetting password!');
  }

  deleteUser() {
    console.log('deleting user!')
  }
}
