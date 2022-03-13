import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService){}
  canActivate() {          
    let user =this.authService.getUser();
    let role = user ? user.role : ' ';
    if(role === "admin") {
    return true;
    } else return false;
  }
  
}
