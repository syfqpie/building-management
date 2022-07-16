import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent implements OnInit {

  // Content
  @ContentChild('contentRef', { static: true }) tplRef!: TemplateRef<any>

  // Checker
  isModalOpen: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal() {
    return this.isModalOpen = !this.isModalOpen
  }

}
