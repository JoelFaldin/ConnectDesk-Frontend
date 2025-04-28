import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Component, inject, ViewChild } from '@angular/core';

import { LogsService } from '@services/logs.service';
import { AllLogsInterface } from '@interfaces/logs.interface';

@Component({
  selector: 'dashboard-chart',
  imports: [BaseChartDirective],
  templateUrl: './dashboard-chart.component.html',
})
export class DashboardChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  logsService = inject(LogsService)

  logs: AllLogsInterface[] = [];
  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };

  chartType: ChartType = 'bar';

  constructor() {
    this.generateChartData();
  }

  generateChartData() {
    const counts: { [date: string]: number } = {};

    this.logsService.getAllLogs().subscribe({
      next: (res: any) => {
        res?.forEach((log: AllLogsInterface) => {
          const date = new Date(log.date).toISOString().split('T')[0];
          counts[date] = (counts[date] || 0) + 1;
        })

        const dates = Object.keys(counts).sort();

        this.chartData.labels = dates;
        this.chartData.datasets = [
          {
            label: 'Logs per day',
            data: dates.map(date => counts[date]),
            backgroundColor: '#42A5F5',
          }
        ]

        this.logs = res.map((log: AllLogsInterface) => ({
          ...log,
          date: new Date(log.date)
        }));

        this.chart?.update();
      }
    })
  }
}
