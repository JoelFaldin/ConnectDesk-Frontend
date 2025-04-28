import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from '@services/toast.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'side-menu-footer',
  imports: [MatIconModule, ConfirmDialogModule, DialogModule, ButtonModule],
  templateUrl: './side-menu-footer.component.html',
})
export class SideMenuFooterComponent {
  authService = inject(AuthService);
  toast = inject(ToastService)
  router = inject(Router);

  showDialog = signal(false);

  handleLogout() {
    this.toast.success('Logging out', 'Successfully logged out!');
    this.router.navigate(["/login"]);
    this.authService.logout();
  }

  toggleDialog(arg: boolean) {
    this.showDialog.set(arg);
  }
}
