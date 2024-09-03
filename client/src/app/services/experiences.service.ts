import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperienceItem } from '../models/ExperienceItem.model';
import { ExperienceList } from '../models/ExperienceList.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {

  baseUrl:string;
  constructor(private _config: ConfigService,private _client:HttpClient) { 
    this.baseUrl=this._config.apiBaseUrl+'/experiences'
  }


  getAll(sectionid:number,page:number=1,limit:number=2) : Observable<ExperienceList> {
    let url=this.baseUrl+"/section/"+sectionid
    
    return this._client.get<ExperienceList>(url)
    
  }

  new(experience:any){
   
     
    return this._client.post(this.baseUrl,experience)

  }

  getOne(id:number){
    return this._client.get<ExperienceItem>(this.baseUrl+"/"+id)
  }

  update(id:number,experience:ExperienceItem){
    return this._client.patch(this.baseUrl+"/"+id,experience)
  }

  delete(id:number){
    return this._client.delete(this.baseUrl+"/"+id)
  }
}
