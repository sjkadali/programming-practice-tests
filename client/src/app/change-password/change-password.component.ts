import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  password: string =''
  confirmPassword: string =''

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.password === this.confirmPassword) {
      this.authService.changePassword(this.password).subscribe( (data) =>{
        alert("password changed: ");
        this.authService.logoutUser();
      }, err => {
        console.log("error!!! ;", err)
      });
    }
  }

  cancelChange(){
    this.router.navigateByUrl("/profile");
  }

}
