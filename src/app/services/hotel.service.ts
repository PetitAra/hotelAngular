import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Client } from '../classes/client';
import { Hotel } from '../classes/hotel';
import { environment } from '../environments/environment';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor( private http : HttpClient, private config : ConfigService ) {  }

   getAll(s ?: string):Observable<Hotel[]>{
    return this.http.get<Hotel[]>(environment.backendUri+"hotel" + (s == undefined ? "" : "?search=" + s), this.config.httpOptions );
   }

    delete(id ?: number): Observable<any>{
      return this.http.delete( environment.backendUri + "hotel/"+id , this.config.httpOptions )
    }

    getById(id ?: number) :Observable<Hotel>{
      return this.http.get<Hotel>( environment.backendUri + "hotel/"+id , this.config.httpOptions ); 
    }

add(h :Hotel) : Observable<any>{
  return this.http.post( environment.backendUri + "hotel" , h , this.config.httpOptions ); 
}

update(h:Hotel) :Observable<any>{
  return this.http.put<Client>(environment.backendUri+"hotel/" + h.id, h, this.config.httpOptions );
}

   }