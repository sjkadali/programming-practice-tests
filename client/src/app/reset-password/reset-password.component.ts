import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: string = ''
  confirmPassword: string = ''
  token: any= ''
  email: any = ''
  error: any =''

  constructor(private authService: AuthService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    let token = this.activatedRoute.snapshot.queryParamMap.get("token");
    let email =  this.activatedRoute.snapshot.queryParamMap.get("email");
    this.token =  token ? token : '';
    this.email = email ? email : '';
  }

  onSubmit() {
    if(this.password === this.confirmPassword) {
      this.authService.resetPassword(this.password,this.email, this.token).subscribe((data => {
        this.router.navigate(['/login']);
      }),(err) =>this.error = err
      );
    } else this.error = "Password and ConfirmPassword does not match!"
  }

}
