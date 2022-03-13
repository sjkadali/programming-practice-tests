import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstName: String ='';
  lastName: String = '';
  email: String ='';
  password: String = '';

  constructor( private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      role: "member"
    }

    if (user) {
      alert("Check your email for activation link");      
      this.authService.registerUser(user).subscribe(data => {
        alert("Registration Successful!");
        this.router.navigate(['login']);  
      }); 
    }
  }

}
