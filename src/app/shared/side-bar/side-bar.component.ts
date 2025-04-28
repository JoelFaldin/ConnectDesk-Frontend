import { Component } from '@angular/core';
import { SideMenuHeaderComponent } from "./side-menu-header/side-menu-header.component";
import { SideMenuPagesComponent } from "./side-menu-pages/side-menu-pages.component";
import { SideMenuFooterComponent } from "./side-menu-footer/side-menu-footer.component";

@Component({
  selector: 'app-side-bar',
  imports: [SideMenuHeaderComponent, SideMenuPagesComponent, SideMenuFooterComponent],
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent { }
