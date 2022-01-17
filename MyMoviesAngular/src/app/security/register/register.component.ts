import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utilities';
import Swal from 'sweetalert2';
import { userCredentials } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private securityService : SecurityService,
              private router : Router) { }

  errors : string[] = []

  emailsent= false;

  ngOnInit(): void {
  }

  register(userCredentials: userCredentials){
    this.errors= [];
    this.securityService.register(userCredentials).subscribe(authenticationResponse => {
      this.emailsent=true;
      Swal.fire('Success', 'You have been registered!, Please check your mailbox to confirm your account!', "success");
    }, error => this.errors = parseWebAPIErrors(error));
  }

}
