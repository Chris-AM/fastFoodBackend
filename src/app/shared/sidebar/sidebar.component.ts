import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];

  constructor(private sideBarService: SidebarService) { 
    this.menuItems = sideBarService.menu;
    console.log('menuItems', this.menuItems);
  }

  ngOnInit(): void {
  }

}