import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
  animations: [
    trigger('toggleTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TenantsComponent implements OnInit {

  // Toggler
  addModal = false;

  // Subscriber
  subscription: Subscription

  constructor(
    private loadingBar: LoadingBarService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getData() {
    
  }

  toggleModal(type) {
    this.addModal = !this.addModal;
    if (type === 'open') {
      
    }
    else if (type === 'close') {
      this.notify.openToastrError('', 'Closed')
    }
    else if (type === 'cancel') {
      this.notify.openToastrError('', 'Canceled')
    }
  }

  create() {
    this.loadingBar.useRef('http').start()
    setTimeout(() => {
      this.loadingBar.useRef('http').complete()
      this.notify.openToastrSuccess('t', 't')
      this.toggleModal('open')
    }, 1000);
  }

}
