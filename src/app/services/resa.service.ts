import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../classes/client';
import { Hotel } from '../classes/hotel';
import { Resa } from '../classes/resa';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ResaService {

  constructor( private http : HttpClient, private config : ConfigService ) {  }

   getAll(idclient ?: number):Observable<Resa[]>{
    return this.http.get<Resa[]>(environment.backendUri+"resa?" + (idclient == undefined || (""+idclient) == "" 
                                  || idclient == 0 ? "" : "&client=" + idclient), this.config.httpOptions );
   }

    delete(id ?: number): Observable<any>{
      return this.http.delete( environment.backendUri + "resa/"+id , this.config.httpOptions )
    }

    getById(id ?: number) :Observable<Resa>{
      return this.http.get<Resa>( environment.backendUri + "resa/"+id , this.config.httpOptions ); 
    }

add(r :Resa) : Observable<any>{
  return this.http.post( environment.backendUri + "resa" , r , this.config.httpOptions ); 
}

update(r:Resa) :Observable<any>{
  return this.http.put<Resa>(environment.backendUri+"resa/" + r.id, r, this.config.httpOptions );
}

   }