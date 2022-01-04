import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utilities';
import { newPwCredentials } from '../security.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.css']
})
export class ResetpwComponent implements OnInit {

  constructor(private securityService : SecurityService,
    private router : Router,
    private formBuilder : FormBuilder,
    private route: ActivatedRoute) { }

userId!: string;

token!: string;

form!: FormGroup

errors : string[] = []

newPwCredential!: newPwCredentials

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', {
        validators: [Validators.required]
      }],
      password2: ['', {
        validators: [Validators.required]
      }],
      validator: this.ConfirmedValidator('password', 'confirm_password')
    })

    this.token = this.route.snapshot.queryParams['code'];
    this.userId = this.route.snapshot.queryParams['userId'];
  }

ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

getEmailErrorMsg(){
  var field = this.form.get('password')
  if (field?.hasError('required')){
    return "The password field is required";
  }
  return '';
}

resetpw(){
  this.newPwCredential ={
    email: this.userId,
    password: this.form.get("password")!.value,
    token: this.token.replace(/\s/g, "+")
  };
  this.errors = [];
  this.securityService.resetpassword(this.newPwCredential).subscribe(authenticationResponse => {
      this.router.navigate(['/'])
    }, error =>  console.log(error))
}
}


