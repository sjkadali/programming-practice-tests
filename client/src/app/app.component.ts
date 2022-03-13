import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  
  title = 'ProgrammingPracticeTests';  
  isLoggedIn = false;

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
