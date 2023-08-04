import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/employees', title: 'Users',  icon:'person', class: '' },
    { path: '/bookings', title: 'Bookings',  icon:'event', class: '' },
    { path: '/malls', title: 'Parking lots',  icon:'local_parking', class: '' },
    { path: '/slots', title: 'Parking spots',  icon:'local_parking', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  
}
