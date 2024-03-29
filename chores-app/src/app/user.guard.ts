import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './users/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private userService:UserService,
    private router:Router
  ){

  }
  canActivate(): boolean{
    if(this.userService.loggedIn()){
      
      return true;
    }    
    this.router.navigate(['/signin'])
    return false;
  }
  
}
