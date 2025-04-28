import { Component } from '@angular/core';

import { DashboardSummaryComponent } from './dashboard-summary/dashboard-summary.component';
import { DashboardActionsComponent } from './dashboard-actions/dashboard-actions.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardSummaryComponent, DashboardChartComponent, DashboardActionsComponent],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent { }
