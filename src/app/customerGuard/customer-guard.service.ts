import { Injectable } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuardService {
  TOKEN_KEY = 'PUBLIC-AUTH-TOKEN-CRED';

  constructor(private tokenStorage: TokenStorageService,private _router:Router)
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if(window.localStorage.getItem(this.TOKEN_KEY) == null || window.localStorage.getItem(this.TOKEN_KEY) == undefined)
      {
        //Return False if localStorage is Empty
        return false;
      }
      else{
        alert("reue");
        //Return False if localStorage is !Empty
        return true;
      }
  }
}
