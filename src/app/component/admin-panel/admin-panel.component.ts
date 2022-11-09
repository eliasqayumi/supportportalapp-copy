import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public titleSubject: string = "Admin Panel";
  public showMenus: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  public routed(url: string, title: string): void {
    this.router.navigate([url], { relativeTo: this.activatedRoute });
    this.titleSubject = title;
  }
  public routedHiden(url: string, title: string): void {
    this.router.navigate([url], { relativeTo: this.activatedRoute });
    this.titleSubject = title;
    this.showMenus = false;
  }
  public showMenu(): void {
    // const sideBar: HTMLElement | any = document.getElementById("navSide");
    const sideBarUl: HTMLElement | any = document.getElementsByTagName("UL")[0];
    console.log(this.showMenus)
    if (!this.showMenus) {
      this.showMenus = true;
      // sideBarUl.style.marginLeft = "0";
    } else {
      this.showMenus = false;

    }
  }
}
