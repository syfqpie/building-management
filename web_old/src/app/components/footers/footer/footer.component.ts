import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
})
export class FooterComponent implements OnInit {

  // Date
  date = new Date().getFullYear()

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  navigatePage(path: string) {
    return this.router.navigate([path])
  }

}
