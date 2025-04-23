import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PaginationInterface } from '@interfaces/pagination.interface';
import { UserDataResponse } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

@Component({
  selector: 'table-footer',
  imports: [FormsModule, PaginatorModule, SelectModule],
  templateUrl: './table-footer.component.html',
})
export class TableFooterComponent {
  userService = inject(UserService);
  paginationData: Partial<PaginationInterface> = {};

  page = 0;
  pageSize = 5;

  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 }
  ];

  ngOnInit() {
    this.userService.pagination$.subscribe(data => {
      this.paginationData = data;
    });
  }

  onPageSizeChange(event: number) {
    this.userService.setPaginationData({
      pageSize: event,
    })

    this.pageSize = event;
    this.page = 0;

    this.userService.getUserData('', '', 1, event).subscribe({
      next: (res: UserDataResponse) => {
        this.userService.setUsers(res.content!);
      },
      error: (error) => {
        console.log('there was an error...', error);
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.userService.setPaginationData({
      page: event.page,
    })

    this.page = event.page!;

    this.userService.getUserData('', '', event.page! + 1, this.pageSize).subscribe({
      next: (res: UserDataResponse) => {
        this.userService.setUsers(res.content!);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
