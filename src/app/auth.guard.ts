import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Admin } from './classes/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  

  constructor(private router : Router) {}
  
  
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("appel de canActivate")
  
  if(sessionStorage.getItem("connected")){
    return true;
  }
  this.router.navigate(["login"])
  return false;
        }
  
  canActivateChild(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
    }
  
    isConnected():boolean{
      return sessionStorage.getItem("connected") != null; 
    }
  
    getUser() : Admin{
      let user : Admin; 
      let ss = sessionStorage.getItem("user")
      if( ss != null ){
        user = JSON.parse(ss);
        return user; 
      }
      return new Admin(); 
    }
  
}
