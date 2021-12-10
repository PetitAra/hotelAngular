import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { Admin } from '../classes/admin';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[FooterComponent ],
})
export class HeaderComponent implements OnInit {

  user : Admin = new Admin();


  constructor( private router : Router , public guard : AuthGuard , private fc : FooterComponent , private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    
  }

  submit(){

  }

  logout():void {
    console.log( "logout" ); 
    sessionStorage.removeItem("connected")
    this.router.navigate(['login'])
    sessionStorage.removeItem("user")
   //ChangeDetectorRef.detectChanges()
  }

}