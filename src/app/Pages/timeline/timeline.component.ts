import { IPost } from '../../Shared/Models/ipost';
import { PostsService } from './../../Core/Services/posts/posts.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit{

  private readonly postsService = inject(PostsService);

  posts : IPost[] = [];

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(){
    this.postsService.getAllPosts().subscribe({
      next:(res)=>{
        console.log(res);
        this.posts = res.posts;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
