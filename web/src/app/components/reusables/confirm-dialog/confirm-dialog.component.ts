import {
  EventEmitter,
  Component,
  Input,
  OnInit,
  Output,
  TemplateRef } from '@angular/core';

export enum ModalSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg'
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  // Data
  @Input() title: string | undefined
  @Input() modalSize: ModalSize = ModalSize.MD
  @Input() isOpen: boolean = false
  @Input() isProcessing: boolean = false
  @Input() headerTemplate: TemplateRef<any> | null = null

  // Event
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter()
  @Output() onConfirm: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.onCancel.emit(true)
  }

  confirm() {
    this.onConfirm.emit(true)
  }

}
