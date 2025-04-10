import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: string,
  label: string,
  route: string,
}

@Component({
  selector: 'side-menu-pages',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './side-menu-pages.component.html',
})
export class SideMenuPagesComponent {
  menuOptions: MenuOption[] = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'people',
      label: 'Users',
      route: '/dashboard/users'
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: '/dashboard/settings'
    }
  ]
}
