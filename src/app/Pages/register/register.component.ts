import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { UsersService } from '../../Core/Services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  successMsg : string = '';
  errorMsg : string = '';

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null,[Validators.required]),
    password: new FormControl(null,[Validators.required]),
    rePassword: new FormControl(null,[Validators.required]),
    dateOfBirth: new FormControl(null,[Validators.required]),
    gender: new FormControl(null,[Validators.required])
  })

  submitRegisterForm(){
    if(this.registerForm.valid){
      this.usersService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.successMsg = res.message;
          this.errorMsg = '';
          this.router.navigate(['login'])
        },
        error:(err)=>{
          console.log(err);
          this.errorMsg = err.statusText;
          this.successMsg = '';
        }
      })
    }
  }
}
