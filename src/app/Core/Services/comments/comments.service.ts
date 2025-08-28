import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor( private httpCliient : HttpClient ) { }

  createComment(data:any) : Observable<any> {
    return this.httpCliient.post(`${environment.baseUrl}comments`, data)
  }

  getPostComments(postId:string) : Observable<any> {
    return this.httpCliient.get(`${environment.baseUrl}posts/${postId}/comments`)
  }

  updateComments(commentId:string, data:any) : Observable<any> {
    return this.httpCliient.put(`${environment.baseUrl}comments/${commentId}` , data)
  }

  deleteComment(commentId:string) : Observable<any> {
    return this.httpCliient.delete(`${environment.baseUrl}comments/${commentId}`)
  }

}
