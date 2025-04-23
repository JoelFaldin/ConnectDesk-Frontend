import { Component } from '@angular/core';

import { TableLogsComponent } from './table-logs/table-logs.component';

@Component({
  selector: 'app-logs',
  imports: [TableLogsComponent],
  templateUrl: './logs.component.html',
})
export default class LogsComponent {

}
