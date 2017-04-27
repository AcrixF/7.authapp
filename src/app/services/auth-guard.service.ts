import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private auth:Auth, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state:RouterStateSnapshot){

    if(this.auth.authenticated()){
      console.log("El Guard paso");
      return true;
    }else{
      console.log("Bloqueado por el Guard");
      this.router.navigate(['/home']);
      return false;
    }

  }

}
