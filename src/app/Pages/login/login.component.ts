import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../Core/Services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  successMsg : string = '';
  errorMsg : string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  submitLoginForm(){
    if(this.loginForm.valid){
      this.usersService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.errorMsg = '';
          this.successMsg = res.message;
          localStorage.setItem('Token', res.token);
          this.usersService.getUserData();
          setTimeout( ()=>{
            this.router.navigate(['timeline'])
          }, 1000)
        },
        error:(err)=>{
          console.log(err);
          this.errorMsg = err.error;
        },
      })
    }
  }
}
