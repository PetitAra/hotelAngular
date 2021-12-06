import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Client } from '../classes/client';
import { environment } from '../environments/environment';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private http : HttpClient, private config : ConfigService ) {  }

   getAll(s ?: string):Observable<Client[]>{
    return this.http.get<Client[]>(environment.backendUri+"client" + (s == undefined ? "" : "?search=" + s), this.config.httpOptions );
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