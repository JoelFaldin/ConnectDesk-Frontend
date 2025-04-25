import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

interface MenuOption {
  icon: string,
  label: string,
  route: string,
}

@Component({
  selector: 'side-menu-pages',
  imports: [RouterLink, MatIconModule, NgClass],
  templateUrl: './side-menu-pages.component.html',
})
export class SideMenuPagesComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  menuOptions: MenuOption[] = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'people',
      label: 'Users',
      route: '/users'
    },
    {
      icon: 'table_chart',
      label: 'Excel',
      route: '/excel'
    },
    {
      icon: 'dns',
      label: 'Logs',
      route: '/logs'
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: '/settings'
    }
  ]

  renderActive(path: string): string {
    return this.currentRoute === path
      ? 'bg-purple-500/10 text-purple-500'
      : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
  }
}
