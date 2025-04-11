import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent { }
