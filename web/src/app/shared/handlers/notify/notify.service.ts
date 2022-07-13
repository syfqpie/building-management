import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr: ToastrService) { }

  info(title: string, message: string) {
    return this.toastr.info(message, title, {
      closeButton: true,
      easing: 'ease-out',
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 50000000
    })
  }

  warning(title: string, message: string) {
    return this.toastr.warning(message, title, {
      closeButton: true,
      easing: 'ease-out',
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 50000000
    })
  }

  success(title: string, message: string) {
    return this.toastr.success(message, title, {
      closeButton: true,
      easing: 'ease-out',
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 50000000
    })
  }

  error(title: string, message: string) {
    return this.toastr.error(message, title, {
      closeButton: true,
      easing: 'ease-out',
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 50000000
    })
  }

  remove(toastId: number) {
    return this.toastr.remove(toastId)
  }

  clear() {
    return this.toastr.clear()
  }

}
