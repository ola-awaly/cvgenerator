import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CvItem } from '../models/CvItem.model';
import { CvList } from '../models/CvList.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CvService {

 
  baseUrl:string;
  constructor(private _config: ConfigService,private _client:HttpClient) { 
    this.baseUrl=this._config.apiBaseUrl+'/cvs'
  }


  getAll(page:number=1,limit:number=2) : Observable<CvList> {
    
    return this._client.get<CvList>(this.baseUrl)
    
  }
  getByUserId(userid:number,page:number=1,limit:number=2) : Observable<CvList> {
    
    return this._client.get<CvList>(this.baseUrl+"/user/"+userid)
    
  }

  new(cv:any){
   
     
    return this._client.post(this.baseUrl,cv)

  }

  getOne(id:number){
    return this._client.get<CvItem>(this.baseUrl+"/"+id)
  }

  update(id:number,cv:CvItem){
    return this._client.patch(this.baseUrl+"/"+id,cv)
  }

  updatephoto(id:number,image:any){
    return this._client.post(this.baseUrl+"/photo/"+id+"/",image)
  }
  updatephoto64(id:number,image:any){
    return this._client.post(this.baseUrl+"/photo64/"+id+"/",image)
  }

  delete(id:number){
    return this._client.delete(this.baseUrl+"/"+id)
  }

  duplicate(id:number){
    return this._client.get(this.baseUrl+"/duplicate/"+id)
  }
  updatepdf(id:number,pdf:any){
    return this._client.post(this.baseUrl+"/pdf/"+id+"/",pdf)
  }
  sendByMail(id:number,toEmail:string,subject:string,message:string){
    return this._client.post(this.baseUrl+'/sendByMail/'+id,
              {
                toEmail,subject,message
              })
  }
}
