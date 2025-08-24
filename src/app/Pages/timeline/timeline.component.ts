import { DatePipe } from '@angular/common';
import { IPost } from '../../Shared/Models/ipost';
import { PostsService } from './../../Core/Services/posts/posts.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommentComponent } from "../../Shared/Components/comment/comment.component";
import { NewPostComponent } from "../new-post/new-post.component";

@Component({
  selector: 'app-timeline',
  imports: [DatePipe, CommentComponent, NewPostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit{

  private readonly postsService = inject(PostsService);

  posts : WritableSignal<IPost[]> = signal([]);
  isModalOpen : boolean = false;

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(){
    this.postsService.getAllPosts().subscribe({
      next:(res)=>{
        const lastPage = res.paginationInfo.numberOfPages;
        this.postsService.getAllPosts(lastPage).subscribe({
          next: (lastRes) => {
            console.log(lastRes);
            console.log("Latest posts:", lastRes.posts);
            this.posts.set(lastRes.posts.reverse());
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



  onModalOpen(){
    this.isModalOpen = true;
  }

  onModalClose(){
    this.isModalOpen = false;
  }
}
