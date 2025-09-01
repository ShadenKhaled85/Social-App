import { Routes } from '@angular/router';
import { TimelineComponent } from './Pages/timeline/timeline.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { BlankComponent } from './Layouts/blank/blank.component';
import { AuthComponent } from './Layouts/auth/auth.component';
import { authGuard } from './Core/Guards/auth/auth.guard';
import { loggedGuard } from './Core/Guards/logged/logged.guard';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';

export const routes: Routes = [
  {path:'', redirectTo:'timeline', pathMatch:'full'},

  {path:'' , component:BlankComponent, canActivate:[authGuard] ,children:[
    {path:'timeline' , component:TimelineComponent, title: 'Timeline'},
    {path:'userProfile' , component:UserProfileComponent, title: 'User Profile'},
  ]},

  {path:'' , component:AuthComponent, canActivate:[loggedGuard], children:[
    {path:'login' , component:LoginComponent, title: 'Login'},
    {path:'register' , component:RegisterComponent, title: 'Register'},
    {path:'forgotPass' , component:ForgotPasswordComponent, title: 'Forgot Password'},
  ]},

  {path:'**' , component:NotFoundComponent, title: 'Not Found!!!'}
];
