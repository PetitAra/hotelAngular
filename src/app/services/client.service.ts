import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Client } from '../classes/client';
 
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private http : HttpClient, private config : ConfigService ) {  }


    getAll(s ?: string, idresa ?: number):Observable<Client[]>{
    return this.http.get<Client[]>(environment.backendUri+"client" + (s == undefined ? "" : "?search=" + s)
    + ( idresa == undefined || (""+idresa) == "" || idresa == 0 ? "" : "&resa=" + idresa ), this.config.httpOptions );
   }

    delete(id ?: number): Observable<any>{
      return this.http.delete( environment.backendUri + "client/"+id , this.config.httpOptions )
    }

    getById(id ?: number) :Observable<Client>{
      return this.http.get<Client>( environment.backendUri + "client/"+id , this.config.httpOptions ); 
    }

add(c :Client) : Observable<any>{
  return this.http.post( environment.backendUri + "client" , c , this.config.httpOptions ); 
}

update(c:Client) :Observable<any>{
  return this.http.put<Client>(environment.backendUri+"client/" + c.id, c, this.config.httpOptions );
}

   }