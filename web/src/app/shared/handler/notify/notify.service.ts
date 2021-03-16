import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    public toastr: ToastrService
  ) { }

  openToastrInfo(title: any, message: string) {
    this.toastr.info(message, title)
  }

  openToastrWarning(title: any, message: string) {
    this.toastr.warning(message, title)
  }

  openToastrSuccess(title: any, message: string) {
    this.toastr.success(message, title)
  }

  openToastrError(title: any, message: string) {
    this.toastr.error(message, title)
  }

}
