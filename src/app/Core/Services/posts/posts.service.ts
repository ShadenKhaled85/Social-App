import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private httpCliient : HttpClient ) { }

  createPost(data:any) : Observable<any> {
    return this.httpCliient.post(`${environment.baseUrl}posts`, data)
  }

  getAllPosts() : Observable<any> {
    return this.httpCliient.get(`${environment.baseUrl}posts`)
  }

  getMyPosts() : Observable<any> {
    return this.httpCliient.get(`${environment.baseUrl}users/664bcf3e33da217c4af21f00/posts`)
  }

  getSinglePost(postId:string) : Observable<any> {
    return this.httpCliient.get(`${environment.baseUrl}posts/${postId}`)
  }

  updatePost(postId:string , data:any) : Observable<any> {
    return this.httpCliient.put(`${environment.baseUrl}posts/${postId}`, data)
  }

  deletePost(postId:string): Observable<any> {
    return this.httpCliient.delete(`${environment.baseUrl}posts/${postId}`)
  }

}
