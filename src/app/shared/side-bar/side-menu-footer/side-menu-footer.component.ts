import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'side-menu-footer',
  imports: [MatIconModule],
  templateUrl: './side-menu-footer.component.html',
})
export class SideMenuFooterComponent {
  authService = inject(AuthService);
}
