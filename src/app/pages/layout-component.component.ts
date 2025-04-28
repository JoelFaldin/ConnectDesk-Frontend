import { Router, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { SideBarComponent } from '@shared/side-bar/side-bar.component';
import { inject } from '@angular/core';

@Component({
  selector: 'layout-component',
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './layout-component.component.html',
})
export default class LayoutComponent {
  router = inject(Router);

  ngOnInit() {
    this.router.navigate(["dashboard"]);
  }

}
