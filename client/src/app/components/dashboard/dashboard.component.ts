import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserItem } from 'src/app/models/UserITem.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  logged!:boolean
  status!:Subscription
  loggedUserObj!:UserItem
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this.status=this._auth.isAuthSubject.subscribe({
      next: data => {
        this.logged=data
        const loggedUser=localStorage.getItem('loggedUser')
        console.log(loggedUser);
        
        if(loggedUser)
        {
          this.loggedUserObj=JSON.parse(loggedUser)
          
        }
      }
    })
  }
  ngOnDestroy(): void {
      this.status.unsubscribe()
  }

}
