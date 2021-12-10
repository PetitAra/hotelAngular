import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/classes/client';
import { Hotel } from 'src/app/classes/hotel';
import { Resa } from 'src/app/classes/resa';
import { ClientService } from 'src/app/services/client.service';
import { ConfigService } from 'src/app/services/config.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ResaService } from 'src/app/services/resa.service';

@Component({
  selector: 'app-resa-details',
  templateUrl: './resa-details.component.html',
  styleUrls: ['./resa-details.component.css']
})
export class ResaDetailsComponent implements OnInit {

  resas: Array<Resa> = [];
  resa: Resa = new Resa()
  clients: Array<Client> =[];
  client: Client = new Client()
  hotel : Hotel = new Hotel()
  hotels: Array<Hotel> =[];
  errorMessage: string=""
  success: boolean = false;
  resaClient : Array<any> =[]
  

  resaForm = new FormGroup({
    id : new FormControl("" , Validators.required),
    datedeb : new FormControl(""  , Validators.required ),
    datefin: new FormControl(""  , Validators.required ),
    numChambre : new FormControl(""  , Validators.required),
    client : new FormControl(""  , Validators.required),
    hotel : new FormControl(""  , Validators.required)
  });

  constructor(private cs: ClientService, public hs: HotelService , private rs: ResaService
   , public config: ConfigService, private router : Router , private aRoute: ActivatedRoute) {
    let resaId = Number( this.aRoute.snapshot.paramMap.get('id') ); 
    if( resaId > 0 ){
      this.rs.getById( resaId ).subscribe(
        data => this.resa = data
      );
  
    }
   }

   getResaClient(): void {
    this.cs.getAll().subscribe(
      data => this.clients = data
    ),
    this.hs.getAll().subscribe(
      data => this.hotels = data
    );  }


 ngOnInit(): void {
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
      this.router.navigate(["resa"])
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
