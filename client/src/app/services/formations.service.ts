import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormationItem } from '../models/FormationItem.model';
import { FormationList } from '../models/FormationList.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FormationsService {
  baseUrl:string;
  constructor(private _config: ConfigService,private _client:HttpClient) { 
    this.baseUrl=this._config.apiBaseUrl+'/formations'
  }


  getAll(sectionid:number,page:number=1,limit:number=2) : Observable<FormationList> {
    let url=this.baseUrl+"/section/"+sectionid
    
    return this._client.get<FormationList>(url)
    
  }

  new(formation:any){
   
     
    return this._client.post(this.baseUrl,formation)

  }

  getOne(id:number){
    return this._client.get<FormationItem>(this.baseUrl+"/"+id)
  }

  update(id:number,formation:FormationItem){
    return this._client.patch(this.baseUrl+"/"+id,formation)
  }

  delete(id:number){
    return this._client.delete(this.baseUrl+"/"+id)
  }
}
