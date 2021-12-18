import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { userCredentials } from '../security.model'
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private securityService : SecurityService,
              private router : Router) { }

  errors : string[] = []
  ngOnInit(): void {
  }

  login(userCredentials: userCredentials){
    this.errors = [];
      this.securityService.login(userCredentials).subscribe(authenticationResponse => {
        this.securityService.saveToken(authenticationResponse)
        this.router.navigate(['/'])
      }, error => this.errors = parseWebAPIErrors(error))
  }
}
