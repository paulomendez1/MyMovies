import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security/security.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public securityService: SecurityService) { }

  ngOnInit(): void {
  }

}
