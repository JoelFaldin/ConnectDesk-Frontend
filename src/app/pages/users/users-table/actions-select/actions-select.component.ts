import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { ResetModalComponent } from './reset-modal/reset-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'actions-select',
  imports: [CommonModule, MenuModule, ButtonModule, MatIconModule, DialogModule, EditModalComponent, ResetModalComponent, DeleteModalComponent],
  standalone: true,
  templateUrl: './actions-select.component.html',
})
export class ActionsSelectComponent {
  menuItems: MenuItem[] = [];
  @Input() userRut: string = '';

  editDialogVisible: WritableSignal<boolean> = signal(false);
  resetDialogVisible: WritableSignal<boolean> = signal(false);
  deleteDialogVisible: WritableSignal<boolean> = signal(false);

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
    this.editDialogVisible.set(true);
  }

  resetPassword() {
    this.resetDialogVisible.set(true);
  }

  deleteUser() {
    this.deleteDialogVisible.set(true);
  }
}
