import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import Popper from 'popper.js';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
})
export class UserDropdownComponent implements OnInit {

  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef: ElementRef;
  @ViewChild('btnProfile',{ static: false }) btnProfile:ElementRef;
  popper = document.createElement('div');

  constructor(
    private loadingBar: LoadingBarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.popper.innerHTML = `
      <div class='bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1' style='min-width:12rem' #btnDropdownRef>
        <button type="button" [routerLink]="" onclick="navigatePage('/settings')" class='text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800' #btnProfile>
          Profile
        </button>
        <div class='h-0 my-2 border border-solid border-gray-200'></div>
        <a href='#pablo' class='text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent  text-gray-800'>
          Logout
        </a>
      </div>`;
  }

  navigatePage(path: string) {
    console.log('asdsd')
    return this.router.navigate([path])
  }

  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
      this.destroyPopper();
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }

  destroyPopper() {
    this.popper.parentNode.removeChild(this.popper);
  }
  
  createPoppper() {
    new Popper(this.btnDropdownRef.nativeElement, this.popper, {
      placement: 'bottom-end',
    });
    this.btnDropdownRef.nativeElement.parentNode.insertBefore(
      this.popper,
      this.btnDropdownRef.nativeElement.nextSibling
    );
  }
}
