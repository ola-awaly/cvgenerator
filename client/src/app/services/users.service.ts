import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserItem } from '../models/UserITem.model';
import { UserList } from '../models/UserList.model';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl:string;
  constructor(private _config: ConfigService,private _client:HttpClient) { 
    this.baseUrl=this._config.apiBaseUrl+'/users'
  }

  

  
  login(email:string,password:string){
    
    let a  =  {email:email,password:password}
    return this._client.post(this.baseUrl+"/login",a)
  }

  getOne(id:number){
    return this._client.get<UserItem>(this.baseUrl+"/"+id)
  }

  new(user:UserItem):Observable<UserItem>{
   
     
    return this._client.post<UserItem>(this.baseUrl,user)

  }
  update(id:number,user:UserItem){
    return this._client.patch(this.baseUrl+"/"+id,user)
  }
  emailExist(email:string):Observable<any>{
    return this._client.get(this.baseUrl + '/emailExistCheck/'+email)
  }

  resetPassword(id:number,user:any){
    return this._client.patch(this.baseUrl + '/resetPassword/'+id,user)
  }
  sendEmailForgetPassword(email:string){
    return this._client.post(this.baseUrl+"/sendEmailForgetPassword",
          {
            email,link:`${this._config.baseUrl}/users/modifier-mot-de-passe-by-token`
          })
  }
  checkRandomToken(token:string){
    return this._client.post(this.baseUrl+"/checkRandomToken",{token})
  }
  resetPasswordByToken(id:number,user:any){
    return this._client.patch(this.baseUrl + '/resetPasswordByToken/',user)
  }
}
