import { Component } from '@angular/core';
import { SideMenuHeaderComponent } from "./side-menu-header/side-menu-header.component";
import { SideMenuPagesComponent } from "./side-menu-pages/side-menu-pages.component";

@Component({
  selector: 'app-side-bar',
  imports: [SideMenuHeaderComponent, SideMenuPagesComponent],
  templateUrl: './side-bar.component.html',
})
export default class SideBarComponent { }
