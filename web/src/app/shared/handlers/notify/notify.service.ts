import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * A service for notification
 * 
 * Uses ngx-toastr
 * 
 * Refer https://github.com/scttcper/ngx-toastr
 */
@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr: ToastrService) { }

  /**
   * Invoke info notification
   * 
   * @param title - notification title
   * @param message - notification message
   *
   * @returns A new toastr
   */
  info(title: string, message: string) {
    return this.toastr.info(message, title, {
      closeButton: true,
      easing: 'ease-out',
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 5000
    })
  }

  /**
   * Invoke warning notification
   * 
   * @param title - notification title
   * @param message - notification message
   *
   * @returns A new toastr
   */
  warning(title: string, message: string) {
    return this.toastr.warning(message, title, {
      closeButton: true,
      easing: 'ease-out',
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 5000
    })
  }

  /**
   * Invoke success notification
   * 
   * @param title - notification title
   * @param message - notification message
   *
   * @returns A new toastr
   */
  success(title: string, message: string) {
    return this.toastr.success(message, title, {
      closeButton: true,
      easing: 'ease-out',
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 5000
    })
  }

  /**
   * Invoke error notification
   * 
   * @param title - notification title
   * @param message - notification message
   *
   * @returns A new toastr
   */
  error(title: string, message: string) {
    return this.toastr.error(message, title, {
      closeButton: true,
      easing: 'ease-out',
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: 5000
    })
  }

  /**
   * Remove a toastr
   * 
   * @param toastId - Generated toastr ID
   *
   * @returns Nothing
   */
  remove(toastId: number) {
    return this.toastr.remove(toastId)
  }

  /**
   * Clear all notifications
   *
   * @returns Nothing
   */
  clear() {
    return this.toastr.clear()
  }

}
