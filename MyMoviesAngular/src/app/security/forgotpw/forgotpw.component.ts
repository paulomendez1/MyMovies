import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../security.service';
import { resetPwCredentials, userCredentials } from '../security.model'
import { parseWebAPIErrors } from 'src/app/utilities/utilities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.component.html',
  styleUrls: ['./forgotpw.component.css']
})
export class ForgotpwComponent implements OnInit {

  constructor(private securityService : SecurityService,
    private router : Router,
    private formBuilder : FormBuilder) { }

    errors : string[] = []
    
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        email: ['', {
          validators: [Validators.required, Validators.email]
        }],
        password: ['', {
          validators: [Validators.required]
        }]
      })
    }

  form!: FormGroup

  email! : string 

  resetPwCredential!: resetPwCredentials
  
  getEmailErrorMsg(){
    var field = this.form.get('email')
    if (field?.hasError('required')){
      return "The email field is required";
    }
    if (field?.hasError('email')){
      return "The email format is invalid";
    }
    return ''
  }

  forgotPw(){
    this.resetPwCredential ={
      email: this.form.get("email")!.value
    };
    this.errors = [];
    this.securityService.forgotpw(this.resetPwCredential).subscribe(authenticationResponse => {
        this.router.navigate(['/'])
      }, error => this.errors = parseWebAPIErrors(error))
  }
}
