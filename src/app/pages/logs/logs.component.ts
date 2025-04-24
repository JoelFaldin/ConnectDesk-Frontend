import { Component } from '@angular/core';

import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableLogsComponent } from './table-logs/table-logs.component';

@Component({
  selector: 'app-logs',
  imports: [TableLogsComponent, TableFooterComponent],
  templateUrl: './logs.component.html',
})
export default class LogsComponent {

}
