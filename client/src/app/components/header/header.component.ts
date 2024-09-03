import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserItem } from 'src/app/models/UserITem.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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

  logout(){
    this._auth.logout()
  }

}
