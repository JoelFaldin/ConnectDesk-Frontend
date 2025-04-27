import { Component } from '@angular/core';

import { DashboardSummaryComponent } from './dashboard-summary/dashboard-summary.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardSummaryComponent, DashboardChartComponent],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent { }
