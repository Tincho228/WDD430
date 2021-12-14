import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserItemService } from './user-item.service';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User[]> {
  constructor(
    private userItemService:UserItemService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Promise<User[]> | User[] {
    return this.userItemService.getUsers()
  }
}
