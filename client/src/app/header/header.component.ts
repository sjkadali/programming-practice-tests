import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  
 userSubscription: Subscription;
  menuItems = [
    {linkId: 1, linkName: 'Home', link:'home'},
    {linkId: 2, linkName: 'SampleTests', link: 'sample-tests'},
    {linkId: 3, linkName: 'About', link: 'about'}

  ];
  isLoggedIn = false;
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    role: ''   
  };
  
  constructor(private authService: AuthService) {    
    this.userSubscription = this.authService.user.subscribe(res => {
      this.user = res;
    });
  
  }

  ngOnInit(): void { 
    if (this.authService.isLoggedIn()) {     
      this.isLoggedIn = true; 
      this.user = this.authService.getcurrentUser();        
    }
  
  }

  ngDoCheck(): void {
    if (this.authService.isLoggedIn()) {     
      this.isLoggedIn = true; 
      this.user = this.authService.getcurrentUser();        
    }
    else {
      this.user = {
        firstName: '',
        lastName: '',
        email: '',
        role: ''   
      }
      this.isLoggedIn = false;
    }
  }

  ngOnDestroy() {
   this.userSubscription.unsubscribe();
  }

  isAdmin(){
    return this.authService.isAdmin();   
  }

  logOut() {
    this.authService.logoutUser();
  }
}
