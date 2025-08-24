import { DatePipe } from '@angular/common';
import { IPost } from '../../Shared/Models/ipost';
import { PostsService } from './../../Core/Services/posts/posts.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommentComponent } from "../../Shared/Components/comment/comment.component";

@Component({
  selector: 'app-timeline',
  imports: [DatePipe, CommentComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit{

  private readonly postsService = inject(PostsService);

  posts : WritableSignal<IPost[]> = signal([]);

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(){
    this.postsService.getAllPosts().subscribe({
      next:(res)=>{
        console.log(res.posts);
        this.posts.set(res.posts);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
