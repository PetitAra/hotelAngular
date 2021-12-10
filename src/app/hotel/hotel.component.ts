import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Hotel } from '../classes/hotel';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  hotels: Array<Hotel> = [];
  hotel: Hotel = new Hotel();
  search: string = ""
  errorMessage: string = ""
  success: boolean = false

  modalForm = new FormGroup({
    id : new FormControl("" , Validators.required),
    nom : new FormControl(""  , Validators.required ),
    etoiles: new FormControl(""  , Validators.required ),
    adresse : new FormControl(""  , Validators.required),
    telephone : new FormControl(""  , Validators.required),
    email : new FormControl(""  , Validators.required),
    ville : new FormControl(""  , Validators.required)

  });

  @ViewChild("closebutton") closebuttonelement: any;

  searchForm = new FormGroup({
    item: new FormControl(""),
  });

  constructor(private hs: HotelService) {
  }

  ngOnInit(): void {
    this.reloadHotels();
  }

  reloadHotels(): void {
    console.log("search ==" + this.search)
    this.hotels=[]
    this.hs.getAll(this.search).subscribe({
      next: (data) => { this.hotels = data },
      error: (err) => { console.log(err.error.message) }
    });
  }

  clearHotels(): void {
  }

  resetHotel() {
    this.hotel = new Hotel();
  }

  delete(id: number | undefined): void {

    if (confirm("Êtes vous sur ?")) {
      this.hs.delete(id).subscribe(
        data => {
          this.reloadHotels();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  edit(id?: number) {
    this.hs.getById(id).subscribe(
      data => { this.hotel = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  submitHotel() {
    let obs: Observable<any>;
    if (this.hotel.id == undefined) { // Ajout
      obs = this.hs.add(this.hotel);
    } else { // Edition
      obs = this.hs.update(this.hotel);
    }

    obs.subscribe(
      {
        next: () => {
          this.reloadHotels();
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


}
