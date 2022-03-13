import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
           
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  token ='';
  jwtHelper = new JwtHelperService();

  constructor( private httpClient: HttpClient, private router: Router) { 
    const currentUser = sessionStorage.getItem('user') || '{}';
    const currentUserStr = JSON.parse(currentUser);
    this.userSubject = new BehaviorSubject<any>(currentUserStr);
    this.user = this.userSubject.asObservable();
  }

  activateAccount(token: any) {
    return this.httpClient.post('http://localhost:3000/signup/activateAccount', {token});
  }

  isAdmin() {
    let res;
    let role = this.getUser() ? this.getUser().role : '';  
    res = role === "admin" ? true  : false;       
    return res;
  }

  getToken() {
    return sessionStorage.getItem("token");
  }

  tokenExpired(): boolean{
    const token = this.getToken();
    let exp = true;
    if (token) {
      const tokenExpiry = this.jwtHelper.getTokenExpirationDate(token)?.valueOf();
      if (tokenExpiry) {
        exp = tokenExpiry- new Date().valueOf() > 0 ? false : true; 
      }         
    }
    return exp;
  }

  isLoggedIn() {
    if (!this.tokenExpired()) {
      return true;
    }
    return false;
  }

  public getcurrentUser():User {
   return this.userSubject.value;  
  }

  getUser()  {
    let token = this.getToken();
    if(token) {
      let user = this.jwtHelper.decodeToken(token);
      return user;
    }        
  }

  getProfile(email: String) {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': this.getToken() || this.token
    });
    return this.httpClient.get<any>(`http://localhost:3000/secure/users/profile/${email}`, {headers: httpHeaders});
  }

  updateProfile(userData: any) {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': this.getToken() || this.token
    });
    const updateResult = this.httpClient.put<any>(`http://localhost:3000/secure/users/profile/${userData.email}`, {userData}, {headers: httpHeaders}).subscribe( res => {
      let token = sessionStorage.getItem('token') || '';
      let decryptedUser = this.jwtHelper.decodeToken(token);
      const user = {
        firstName: res.result.firstName,
        lastName: res.result.lastName,
        email: res.result.email,
        role: res.result.role,
        iat: decryptedUser.iat,
        exp: decryptedUser.exp
      };     
      this.userSubject.next(user); 
      return res;
    })
    return updateResult;
  }

  forgotPassword(email: string) : Observable<object> {
    return this.httpClient.post('http://localhost:3000/forgotPassword',{email: email});
  }

  resetPassword(password: string, email: any, token: any) {
    const resetInfo = {
      password: password,
      email : email,
      token: token
    }    
    return this.httpClient.patch<any>('http://localhost:3000/resetPassword', {resetInfo});
  }

  changePassword(password: string) {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': this.getToken() || this.token
    });
    const email = this.getUser().email;
    return this.httpClient.patch<any>(`http://localhost:3000/secure/users/change-password/${email}`, {password}, {headers: httpHeaders});
  }

  loginUser(loginData: { email: String; password: String; }): Observable<boolean> {
    return this.httpClient.post('http://localhost:3000/login', loginData)
    .pipe(
      map( (data: any) => {
        if (data) {         
         sessionStorage.setItem("token",  data.token);         
         const decryptedUser = this.jwtHelper.decodeToken(data.token);
         
         const info = {
           token: data.token,
           user: decryptedUser,
           role: decryptedUser.role,
           tokenExpiration: decryptedUser.exp,
           id: data.user._id
         };
         sessionStorage.setItem('userInfo', JSON.stringify(info));
         sessionStorage.setItem('user', JSON.stringify(decryptedUser));
         this.userSubject.next(decryptedUser);
         return true;
        }
        return false;
      }));
  }

  registerUser(userData: { firstName: String; 
    lastName: String; email: String; password: String; }) {
    return this.httpClient.post("http://localhost:3000/signup", userData);
  }  

  logoutUser() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem("userInfo");
    this.userSubject.next(null);
    this.router.navigateByUrl('login');
  }
}
