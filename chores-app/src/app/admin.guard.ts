import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserItemService } from './users/user-item.service';
import { User } from './users/user.model';
import { UserService } from './users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private userService:UserService,
    private router:Router,
    private userItemService: UserItemService
  ){}
  canActivate():boolean{
    const userId = this.userService.getUserId()
    const user = this.userItemService.getContact(userId)
    if(user.admin){
      return true
    }
    this.router.navigate(['/users'])
    return false
  }
  
}
