import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemplateItem } from '../models/TemplateItem.model';
import { TemplateList } from '../models/TemplateList.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  baseUrl:string;
  constructor(private _config: ConfigService,private _client:HttpClient) { 
    this.baseUrl=this._config.apiBaseUrl+'/templates'
  }


  getAll(page:number=1,limit:number=2) : Observable<TemplateList> {
   
   
    return this._client.get<TemplateList>(this.baseUrl)
    
  }

  new(template:any){
   
     
    return this._client.post(this.baseUrl,template)

  }

  getOne(id:number){
    return this._client.get<TemplateItem>(this.baseUrl+"/"+id)
  }

  update(id:number,template:TemplateItem){

    return this._client.patch(this.baseUrl+"/"+id,template)
    
  }
}
