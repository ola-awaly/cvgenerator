import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SectionPositionList } from '../models/SectionByPositionList.model';
import { SectionItem } from '../models/SectionItem.model';
import { SectionList } from '../models/SectionList.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

 
 
  baseUrl:string;
  constructor(private _config: ConfigService,private _client:HttpClient) { 
    this.baseUrl=this._config.apiBaseUrl+'/sections'
  }


  getAll(cvid:number,type:string='',position:string='',page:number=1,limit:number=2) : Observable<SectionList|SectionPositionList> {
    let url=this.baseUrl+"/cv/"+cvid
    if(type)
      url += '?type='+type
    if(position)
      url += '?position='+position
    return this._client.get<SectionList|SectionPositionList>(url)
    
  }

  new(section:any){
   
     
    return this._client.post(this.baseUrl,section)

  }

  getOne(id:number){
    return this._client.get<SectionItem>(this.baseUrl+"/"+id)
  }

  update(id:number,section:SectionItem){
    return this._client.patch(this.baseUrl+"/"+id,section)
  }

}
