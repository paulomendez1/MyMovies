import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SecurityService } from '../../security/security.service'

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  public isScreenSmall! : boolean;

  constructor(private bpObserver : BreakpointObserver, 
              public securityService: SecurityService,
              private router: Router) { }

  @ViewChild(MatSidenav) sidenav!: MatSidenav

  ngOnInit(): void {
    this.bpObserver.observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
    .subscribe((state: BreakpointState) => {
      this.isScreenSmall = state.matches;
    });

    this.router.events.subscribe(() =>{
      if(this.isScreenSmall){
        this.sidenav.close();
      }
    })
  }

}
