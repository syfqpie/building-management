import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { MockService } from 'src/app/shared/services/mock/mock.service';

@Component({
  selector: 'app-management-audit-trails',
  templateUrl: './management-audit-trails.component.html',
  styleUrls: ['./management-audit-trails.component.scss']
})
export class ManagementAuditTrailsComponent implements OnInit {

  // Table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = []

  // Subscriber
  subscription: Subscription

  constructor(
    private mockService: MockService,
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
    this.subscription = this.mockService.getAll('audit/audit.data.json').subscribe(
      (res) => {
        // Success
        this.loadingBar.useRef('http').complete()
        this.tableRows = [...res]
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id: key
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
