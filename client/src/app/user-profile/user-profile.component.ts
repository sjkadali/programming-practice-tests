import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../models/user.model';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    role: ['', Validators.required]
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router ) { }
  
  user: User ={
    firstName: '',
    lastName: '',
    email: '',
    role: ''   
  }
  
  ngOnInit(): void {
    this.user = this.authService.getcurrentUser();
    this.profileForm = this.fb.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      role: this.user.role
    });   
  }

  onUpdate() {
    if (this.profileForm.valid) {
      this.user= this.profileForm.value;
      const data = this.authService.updateProfile(this.user); 
      if (data) {
        alert("Profile Updated!");
        this.router.navigateByUrl('home');
      } else  {
        console.log("error");
      }
    }    
  }

  changePassword() {
    this.router.navigateByUrl(`/change-password`);
  }

  onCancel() {
    this.router.navigate(['home']);  
  }
 
}
