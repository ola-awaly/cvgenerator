import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LangueItem } from '../models/LangueItem.model';
import { LangueList } from '../models/LangueList.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LanguesService {

  baseUrl:string;
  constructor(private _config: ConfigService,private _client:HttpClient) { 
    this.baseUrl=this._config.apiBaseUrl+'/langues'
  }


  getAll(sectionid:number,page:number=1,limit:number=2) : Observable<LangueList> {
    let url=this.baseUrl+"/section/"+sectionid
    
    return this._client.get<LangueList>(url)
    
  }

  new(langue:any){
   
     
    return this._client.post(this.baseUrl,langue)

  }

  getOne(id:number){
    return this._client.get<LangueItem>(this.baseUrl+"/"+id)
  }

  update(id:number,langue:LangueItem){
    return this._client.patch(this.baseUrl+"/"+id,langue)
  }

  delete(id:number){
    return this._client.delete(this.baseUrl+"/"+id)
  }
}
