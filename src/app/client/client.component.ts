import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../classes/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Array<Client> = [];
  client: Client = new Client();
  search: string = ""
  errorMessage: string = ""
  success: boolean = false


 // searchForm = new FormGroup({
 //   item : new FormControl(""),
 // });

  constructor(private cs: ClientService) {
  }

  ngOnInit(): void {
    this.reloadClients();
  }

  reloadClients(): void {
    this.cs.getAll().subscribe({
      next: (data) => { this.clients = data },
      error: (err) => { console.log(err.error.message) }
    }); 
  }

  clearClients(): void {
  }

  resetClient() {
    this.client = new Client();
  }

  delete(id: number | undefined): void {

    if (confirm("Êtes vous sur ?")) {
      this.cs.delete(id).subscribe(
        data => {
          this.reloadClients();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  edit(id?: number) {
    this.cs.getById(id).subscribe(
      data => { this.client = data }
      //, err => console.log( "Une erreur est survenue" )
    );
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
          this.reloadClients();
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
