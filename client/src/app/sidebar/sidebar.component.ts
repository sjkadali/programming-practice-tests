import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  status: boolean = true;
 
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isAdmin(){
    return this.authService.isAdmin();   
  }

  clickEvent() {
    this.status = !this.status;
  }

}
