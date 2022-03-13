import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  token: any;
  constructor(private authService: AuthService, 
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
    this.authService.activateAccount(this.token).subscribe(
      (data: any) => {
        if (data) {
          alert("Account activated!");
         this.router.navigate(['login']);         
        }      
    }, error => {
      alert(error);
    });  
  }

}
