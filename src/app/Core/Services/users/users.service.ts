import { IUser } from './../../../Shared/Models/iuser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpCliient : HttpClient,
    private router : Router
  ) { }

  userData : string | null = null;

  signUp(data:IUser) : Observable<any> {
    return this.httpCliient.post(`${environment.baseUrl}users/signup`, data)
  }

  signIn(data:any) : Observable<any> {
    return this.httpCliient.post(`${environment.baseUrl}users/signin`, data)
  }

  getUserData(){
    this.userData = jwtDecode(localStorage.getItem('Token')!)
    console.log(this.userData);
  }

  changePassword(data:any) : Observable<any >{
    return this.httpCliient.patch(`${environment.baseUrl}users/change-password`, data)
  }

  uploadProfilePhoto(data:any) : Observable<any >{
    return this.httpCliient.put(`${environment.baseUrl}users/upload-photo`, data)
  }

  getLoggedUserData() : Observable<any >{
    return this.httpCliient.get(`${environment.baseUrl}users/profile-data`)
  }

  signOut(){
    localStorage.removeItem('Token');
    this.userData = null;
    this.router.navigate(['login']);
  }
}
