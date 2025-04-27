import { Component } from '@angular/core';

import { DashboardSummaryComponent } from './dashboard-summary/dashboard-summary.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardSummaryComponent],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent { }
