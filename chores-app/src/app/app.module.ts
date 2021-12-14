import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { TodosComponent } from './todos/todos.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PrivateComponent } from './private/private.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserGuard } from './user.guard';
import { TokenInterceptorService } from './users/token-interceptor.service';
import { TodosItemComponent } from './todos/todos-item/todos-item.component';
import { TodosDetailComponent } from './todos/todos-detail/todos-detail.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { PrivateItemComponent } from './private/private-item/private-item.component';
import { PrivateProfileComponent } from './private/private-profile/private-profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { UserResolver } from './users/user.resolver';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TodosComponent,
    SignupComponent,
    SigninComponent,
    PrivateComponent,
    TodosItemComponent,
    TodosDetailComponent,
    UserItemComponent,
    PrivateItemComponent,
    PrivateProfileComponent,
    AdminComponent,
    AdminUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserGuard,
    AdminGuard,
    UserResolver,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
