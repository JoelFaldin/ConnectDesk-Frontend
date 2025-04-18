import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'side-menu-footer',
  imports: [MatIconModule],
  templateUrl: './side-menu-footer.component.html',
})
export class SideMenuFooterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  handleLogout() {
    if (confirm('You really want to log out?')) {
      this.router.navigate(['/login']);
      this.authService.logout();
    } else {
      return;
    }
  }
}
