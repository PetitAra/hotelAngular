import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClientComponent } from './client/client.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { ResaComponent } from './resa/resa.component';

const routes: Routes = [
  {path:"hotel",component : HotelComponent, canActivate: [AuthGuard]},
  {path : "client", component :ClientComponent, canActivate: [AuthGuard]},
  {path: "resa", component:ResaComponent, canActivate: [AuthGuard]},
  { path : "login" , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
