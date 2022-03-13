import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    email: '',
    password: ''    
  };
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  token: any ;
  loginTimer: any;
  isValidFormSubmitted = false;

 
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  onLogin(form: NgForm) {    
    if (form.invalid) {
        return;
     }
     this.isValidFormSubmitted = true;     
    this.authService.loginUser(this.loginData).subscribe(
      (data: any) => {       
          this.startLoginTimer();   
          this.router.navigate(['dashboard']);             
    }, (error) => {
      alert("Incorrect email address/password, please try again.: ");
      this.loginData =  { email: '',
    password: ''}
    });
    form.resetForm();
  }

  startLoginTimer() {
    let count = 1;
    this.loginTimer = setTimeout(() => {     
     this.authService.logoutUser();            
    }, 1000000);
  }
}
