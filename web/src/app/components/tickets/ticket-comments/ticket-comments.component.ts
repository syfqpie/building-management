import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/shared/handlers/notify/notify.service';
import { TicketCommentExtended } from 'src/app/shared/services/tickets/tickets.model';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';

@Component({
  selector: 'app-ticket-comments',
  templateUrl: './ticket-comments.component.html',
  styleUrls: ['./ticket-comments.component.scss']
})
export class TicketCommentsComponent implements OnInit, OnDestroy {

  // Input
  @Input('ticketId') ticketId: number | undefined

  // Data
  comments: TicketCommentExtended[] = []

  // Form
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl(null)
  })

  // Checker
  isProcessing: boolean = false // http req

  // Subscription
  svcSubscription: Subscription = new Subscription

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private notifySvc: NotifyService,
    private ticketSvc: TicketsService,
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
    this.commentForm = this.fb.group({
      comment: new FormControl(null, Validators.compose([
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
        },
        error: () => {
          this.isProcessing = false
          this.loadingBar.useRef('http').stop()
        },
        complete: () => {
          this.notifySvc.success('Success', 'Comment added')
        }
      })
    )
  }

  toggleReply(id: number) {
    console.log('Current comment', id)
  }

}
