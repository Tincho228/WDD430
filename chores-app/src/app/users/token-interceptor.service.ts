import { Injectable} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler,HttpEvent } from '@angular/common/http'
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private userService:UserService
  ) { }
  intercept(
    req:HttpRequest<any>, 
    next:HttpHandler
    ):Observable<HttpEvent<any>>{
    const tokenizeReq = req.clone({
      headers:req.headers.append('authorization',`Bearer ${this.userService.getToken()}`)
    })
    return next.handle(tokenizeReq)
  }
  
}
