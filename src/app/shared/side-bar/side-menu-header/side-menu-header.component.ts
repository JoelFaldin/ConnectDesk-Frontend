import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'side-menu-header',
  imports: [RouterLink, MatIconModule],
  templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent { }
