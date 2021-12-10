import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import { ClientComponent } from './client/client.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { ResaDetailsComponent } from './resa/resa-details/resa-details.component';
import { ResaComponent } from './resa/resa.component';

const routes: Routes = [
  {path:"hotel",component : HotelComponent, canActivate: [AuthGuard]},
  {path : "client", component :ClientComponent, canActivate: [AuthGuard]},
  {path: "resa", component:ResaComponent, canActivate: [AuthGuard]},
  { path : "hotel/addedit/:id" , component: HotelComponent, canActivate: [AuthGuard] },
  { path : "client/addedit/:id" , component: ClientDetailsComponent, canActivate: [AuthGuard] },
  { path : "resa/addedit/:id" , component: ResaDetailsComponent, canActivate: [AuthGuard] },
  { path : "login" , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
