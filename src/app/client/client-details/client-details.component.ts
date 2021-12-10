import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/classes/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  clients: Array<Client> = [];
  client: Client = new Client();
  search: string = ""
  errorMessage: string = ""
  success: boolean = false

  myForm = new FormGroup({
    id : new FormControl("" , Validators.required),
    nomComplet : new FormControl(""  , Validators.required ),
    adresse: new FormControl(""  , Validators.required ),
    email : new FormControl(""  , Validators.required),
    telephone : new FormControl(""  , Validators.required),
  });

  constructor(private cs: ClientService,  private router : Router, private aRoute: ActivatedRoute) {
    let clientId = Number( this.aRoute.snapshot.paramMap.get('id') ); 
    if( clientId > 0 ){
      this.cs.getById( clientId ).subscribe(
        data => this.client = data
      );
  
    }
  }

  ngOnInit(): void {
    
  }

 
  submitClient() {
    let obs: Observable<any>;
    if (this.client.id == undefined) { // Ajout
      obs = this.cs.add(this.client);
    } else { // Edition
      obs = this.cs.update(this.client);
    }

    obs.subscribe(
      {
        next: () => {
          this.router.navigate(["client"])
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

}