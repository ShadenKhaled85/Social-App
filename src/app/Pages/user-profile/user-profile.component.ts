import { DatePipe } from '@angular/common';
import { IPost } from '../../Shared/Models/ipost';
import { PostsService } from './../../Core/Services/posts/posts.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommentComponent } from "../../Shared/Components/comment/comment.component";

@Component({
  selector: 'app-user-profile',
  imports: [DatePipe, CommentComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  private readonly postsService = inject(PostsService);

  myPosts: IPost[] = [];

  ngOnInit(): void {
    this.getMyPosts();
  }

  getMyPosts(){
    this.postsService.getMyPosts().subscribe({
      next:(res)=>{
        console.log(res);
        this.myPosts = res.posts;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
