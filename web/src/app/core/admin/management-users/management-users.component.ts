import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-management-users',
  templateUrl: './management-users.component.html',
  styleUrls: ['./management-users.component.scss']
})
export class ManagementUsersComponent implements OnInit {

  // Data
  users: User[] = []
  
  // Table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = []

  // Subscriber
  subscription: Subscription

  constructor(
    private userService: UsersService,
    private loadingBar: LoadingBarService
  ) { 
    this.getData()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    this.loadingBar.useRef('http').start()
    this.subscription = this.userService.getAll().subscribe(
      (res) => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.users = this.userService.users
        this.tableRows = [...this.users]
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_table: key
          };
        });
      },
      () => {
        // Unsuccess
        this.loadingBar.useRef('http').complete()
      },
      () => {
        // After
      }
    )
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) { // Kalau semua data ada
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

}
