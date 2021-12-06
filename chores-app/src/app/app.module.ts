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
import { HttpClientModule } from '@angular/common/http';
import { UserGuard } from './user.guard';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TodosComponent,
    SignupComponent,
    SigninComponent,
    PrivateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserGuard
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
