import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  
  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  isDisabled: boolean = false;
  errorMessage: string;
  error: boolean;

  verifyLogin() {
    let isLoginValid: boolean = false;


    for(let index=0;index< localStorage.length;index++){
      if(this.loginForm.value.username == localStorage.key(index)) {
        if(this.loginForm.value.password == localStorage.getItem(localStorage.key(index))) {
          isLoginValid = true;
        }
      }
    }

    // isLoginValid = true;
    if(isLoginValid) {
      this.route.navigateByUrl("mainPage")    
      console.log("user-login verified!")
    } else if(this.loginForm.invalid) {
      this.errorMessage = "Invalid Credentials";
    }
  }

  dummylogin() {
    this.route.navigateByUrl("shop")
  }

}
