import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';

import { TicketCommentExtended } from 'src/app/shared/services/ticket/ticket.model';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';

@Component({
  selector: 'app-ticket-comments',
  templateUrl: './ticket-comments.component.html',
  styleUrls: ['./ticket-comments.component.scss']
})
export class TicketCommentsComponent implements OnInit, OnDestroy, OnChanges {

  // Input
  @Input('ticketId') ticketId: number | undefined
  @Input('isCompleted') isCompleted: boolean = false

  // Data
  comments: TicketCommentExtended[] = []

  // Form
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl(null)
  })

  // Checker
  isProcessing: boolean = true // http req

  // Subscription
  svcSubscription: Subscription = new Subscription

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private ticketSvc: TicketService,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getData()
  }

  ngOnDestroy(): void {
    // Unsubscribe services subscription
    if (this.svcSubscription) {
      this.svcSubscription.unsubscribe()
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check for checker changes
    const isCompletedChange = changes['isCompleted']
    if (isCompletedChange.currentValue === true &&
      isCompletedChange.previousValue !== undefined) {
      this.commentForm.disable()
    }
  }

  getData() {
    this.isProcessing = true
    this.loadingBar.useRef('http').start()

    this.svcSubscription.add(
      this.ticketSvc.getComments(this.ticketId!).subscribe({
        next: () => {
          this.isProcessing = false
          this.loadingBar.useRef('http').complete()
        },
        error: () => {
          this.isProcessing = false
          this.loadingBar.useRef('http').stop()
        },
        complete: () => {
          this.comments = this.ticketSvc.comments
        }
      })
    )
  }

  initForm() {
    const currentVal = this.isCompleted ? { value: null, disabled: true } : null
    this.commentForm = this.fb.group({
      comment: new FormControl(currentVal, Validators.compose([
        Validators.required
      ]))
    })
  }

  postComment() {
    this.isProcessing = true
    this.loadingBar.useRef('http').start()

    this.svcSubscription.add(
      this.ticketSvc.postComment(this.ticketId!, this.commentForm.value).subscribe({
        next: () => {
          this.isProcessing = false
          this.loadingBar.useRef('http').complete()
          this.notifySvc.success('Success', 'Comment added')
        },
        error: () => {
          this.isProcessing = false
          this.loadingBar.useRef('http').stop()
        },
        complete: () => {
          // Refresh data
          this.getData()

          // Reset form
          this.commentForm.reset()
          this.initForm()
        }
      })
    )
  }

}
