import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from '../classes/client';
import { Hotel } from '../classes/hotel';
import { Resa } from '../classes/resa';
import { ClientService } from '../services/client.service';
import { ConfigService } from '../services/config.service';
import { HotelService } from '../services/hotel.service';
import { ResaService } from '../services/resa.service';

@Component({
  selector: 'app-resa',
  templateUrl: './resa.component.html',
  styleUrls: ['./resa.component.css']
})
export class ResaComponent implements OnInit {

  resas: Array<Resa> = [];
  resa: Resa = new Resa()
  clients: Array<Client> =[];
  client: Client = new Client()
  hotel : Hotel = new Hotel()
  hotels: Array<Hotel> =[];
  errorMessage: string=""
  success: boolean = false;
  resaClient : Array<any> =[]
  
// search param
clientRecherche : number = 0

  @ViewChild("closebutton") closebuttonelement: any;

  searchForm = new FormGroup({
    item: new FormControl(""),
  });

  constructor(private cs: ClientService, public hs: HotelService , private rs: ResaService
   , public config: ConfigService) {}

   getResaClient(): void {
    this.resaClient = [];  }


 ngOnInit(): void {
   this.reloadResas();
   this.getResaClient();
   this.cs.getAll().subscribe({
     next: (data) => { this.clients = data},
     error: (err) => { console.log(err.error.message) }
   });

   this.hs.getAll().subscribe({
    next: (data) => {this.hotels= data },
    error: (err) => { console.log(err.error.message) }
  });
 }

 reloadResas(): void {
 console.log("search ==" + this.clientRecherche)
 this.resas=[];
this.rs.getAll(this.clientRecherche).subscribe(
 data => { 
   this.resas = data

   /* data.forEach( resa => {
     this.clients.getAll(undefined , resa.id ).subscribe(
       ( clt: any) => { 
         if( resa.id != undefined )
           this.resaClient[ resa.id  ] = clt 
         }
     )

   }  ) */

   console.log( this.resaClient )
 }
  //err => console.log("Une erreur est survenue")
)
}


clearResas():void{
  this.resas=[];
}

resetResa() {
  this.resa = new Resa();
}


delete(id ?: number) : void{
  if(confirm('Etes vous sur?')){
  this.rs.delete(id).subscribe(
  data => { this.reloadResas()}
  //err => console.log("Une erreur est survenue")
  )
  }

}

edit(id ?: number){
  this.rs.getById(id).subscribe(
    data => { this.resa= data}
    )
}

submitResa(): void {
 let obs: Observable<any>;
 if (this.resa.id == undefined) { // Ajout
   obs = this.rs.add(this.resa);
 } else { // Edition
   obs = this.rs.update(this.resa);
 }

 obs.subscribe(
   {
     next: () => {
       this.reloadResas();
       this.closebuttonelement.nativeElement.click();
       this.success = true;
       setTimeout(() => {                           // <<<---using ()=> syntax
         this.success = false;
       }, 5000);
     },
     error: (err) => {
       this.errorMessage = err.error.message;
     }
   }
 );
}

checkClient(c1: Client, c2: Client): boolean {
  return c1 != undefined && c2 != undefined && c1.id == c2.id;
}

checkHotel(h1: Hotel, h2: Hotel): boolean {
  return h1 != undefined && h2 != undefined && h1.id == h2.id;
}

  
}
