import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrivateComponent } from "./private/private.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { TodosComponent } from "./todos/todos.component";
import { UsersComponent } from "./users/users.component";
import { UserGuard } from "./user.guard";


const appRoutes:Routes = [
    {
         path:'', 
         redirectTo:'/users', 
         pathMatch:'full' 
    },
    {
         path:'todos', 
         component:TodosComponent
    },
    {
         path:'users', 
         component:UsersComponent
    },
    {
         path:'signin', 
         component:SigninComponent
    },
    {
         path:'signup', 
         component:SignupComponent
    },
    { 
         path:'private', 
         component:PrivateComponent,
         canActivate:[UserGuard]
    }

]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule {

}