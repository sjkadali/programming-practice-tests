import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email ='';
  message: any = '';
  error: any = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {   
    this.message='';
    this.error='';
    this.authService.forgotPassword(this.email).subscribe(
      (data: any) => {       
          this.message = 'Password reset link has been sent. Please check your email.'  
      }, (error)=> {
        this.error = error.error.errorMessage;
      })    
      this.email='';
  }
}
