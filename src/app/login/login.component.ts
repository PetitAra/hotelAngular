import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Admin } from '../classes/admin';
import { ConfigService } from '../services/config.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ""
  password = ""

  constructor(private http: HttpClient, private router: Router, private app: AppComponent, private config: ConfigService) { }

  ngOnInit(): void {
  }

  authenticate() {

    let u = { "username": this.username, "password": this.password }

    // http://localhost:8080/api/login
    this.http.post<Admin>(environment.backendUri + "login", u).subscribe(
      {
        next: (data) => {
          sessionStorage.setItem("connected", "1");
          sessionStorage.setItem("user", JSON.stringify(data))
          this.router.navigate(['hotel'])
          this.app.user = data
          this.config.httpOptions.headers = new HttpHeaders({ 'Authorization': "Basic " + data.password })
        },
        //error: (err) => { console.log(err.error.message) }
      }
    )
  }

}
