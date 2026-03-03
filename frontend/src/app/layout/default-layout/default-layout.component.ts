import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import {
  SidebarComponent,
  SidebarHeaderComponent,
  SidebarBrandComponent,
  SidebarFooterComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
  ContainerComponent,
  ShadowOnScrollDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { DefaultHeaderComponent, DefaultFooterComponent } from './';
import { navItems } from './_nav';
import { INavData } from '@coreui/angular';
import { AuthService } from '../../services/auth.service';


function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ShadowOnScrollDirective,

    DefaultHeaderComponent,
    DefaultFooterComponent,

    ContainerComponent,
    RouterOutlet,
    NgScrollbar,
    IconDirective,
    RouterLink,

  ]
})
export class DefaultLayoutComponent implements OnInit {
  
  public navItemsFiltered: INavData[] = []; 

  constructor(private auth: AuthService) {} 

  ngOnInit(): void {
      const user = this.auth.currentUserValue;

      if(user?.role == 'superuser') {
        this.navItemsFiltered = navItems;
      } else {
        this.navItemsFiltered = navItems.filter(item => item.name != 'Korisnici')
      }
  }

  onScrollbarUpdate(_event: any) {}
}
