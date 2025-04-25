import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { SideBarComponent } from 'app/shared/side-bar/side-bar.component';

@Component({
  selector: 'layout-component',
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './layout-component.component.html',
})
export default class LayoutComponent {

}
