import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SecurityService } from '../security/security.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() toggleSideNav = new EventEmitter<void>();

  constructor(public securityService: SecurityService) { }

  ngOnInit(): void {
  }

}
