import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LienItem } from '../models/LienItem.model';
import { LienList } from '../models/LienList.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LiensService {
  baseUrl:string;
  constructor(private _config: ConfigService,private _client:HttpClient) { 
    this.baseUrl=this._config.apiBaseUrl+'/liens'
  }


  getAll(sectionid:number,page:number=1,limit:number=2) : Observable<LienList> {
    let url=this.baseUrl+"/section/"+sectionid
    
    return this._client.get<LienList>(url)
    
  }

  new(lien:any){
   
     
    return this._client.post(this.baseUrl,lien)

  }

  getOne(id:number){
    return this._client.get<LienItem>(this.baseUrl+"/"+id)
  }

  update(id:number,langue:LienItem){
    return this._client.patch(this.baseUrl+"/"+id,langue)
  }

  delete(id:number){
    return this._client.delete(this.baseUrl+"/"+id)
  }
}
