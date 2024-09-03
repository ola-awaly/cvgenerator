import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject,map, catchError, EMPTY } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _apiService:UsersService,private _router:Router){

  }
  get isAuth() : boolean {
    if(localStorage.getItem('logged') == "true") return true
    else return false
  }

 // isAuthSubject : Subject<boolean> = new Subject<boolean>()
  isAuthSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuth)

  emitSubject() {
    this.isAuthSubject.next(this.isAuth)
  }

  login(email:string,password:string) {

    return this._apiService.login(email,password).pipe(
      map( data =>{
            console.log("dans map");
            if('accessToken' in data) 
              {
                console.log("dans map access token exist");
                
               localStorage.setItem('logged', 'true')
                 localStorage.setItem('loggedUser',JSON.stringify(data))
                 this.emitSubject()
                 return true
             }
             else{
              console.log("dans map access token does not exist");
              localStorage.setItem('logged', 'false')
              localStorage.setItem('loggedUser','')
              this.emitSubject()
              return false
             }
            //return data
           
      }
    ),
    catchError((err, caught) => {
      console.log("dans error");
      
      localStorage.setItem('logged', 'false')
      localStorage.setItem('loggedUser','')
      return err;
    })
    )
      //  this._apiService.login(email,password).subscribe({
      //     next: data=>{
      //         console.log("dans auth service");
      //         console.log(data);
              
      //        if('accessToken' in data) 
      //        {
      //           localStorage.setItem('logged', 'true')
      //           localStorage.setItem('loggedUser',JSON.stringify(data))
      //        }
      //       this.emitSubject()
      //       this._router.navigate(['/home'])
      //       console.log("fin");
            
      //     },
      //     error: (error)=>{
      //       localStorage.setItem('logged', 'false')
      //       localStorage.setItem('loggedUser','')
      //       this.emitSubject()
      //       alert("Not logged")
            
            
      //     }
      // })
      
    
   
  }

  logout() {
    
    localStorage.clear()
    this.emitSubject()
    this._router.navigate(['/users/login'])
  }
}
