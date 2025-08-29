import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../Core/Services/posts/posts.service';
import { FormsModule } from '@angular/forms';
import { IPost } from '../../Shared/Models/ipost';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-post',
  imports: [FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  private readonly postsService = inject(PostsService);
  private readonly toastrService = inject(ToastrService);

  posts : WritableSignal<IPost[]> = signal([]);
  newPostContent : string = '';
  newPostImage : any;

  @Input() isModalOpen : boolean = false;
  @Output() closeModal = new EventEmitter();
  @Output() newPost = new EventEmitter();

  submitCreatePost(){
    let createPostFormData = new FormData();
    createPostFormData.append('body', this.newPostContent)
    createPostFormData.append('image', this.newPostImage)
    this.postsService.createPost(createPostFormData).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success('Post created', 'Posts', {progressBar:true});
        this.newPost.emit(true);
        //  Clear Form
        this.newPostContent = '';
        this.newPostImage = null;
        this.onCloseModal();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onSavingPostImage(e: Event){
    if(e.target !== null){
      let fileImg = e.target as HTMLInputElement;
      this.newPostImage = fileImg.files![0];
      console.log(this.newPostImage);
    }
  }

  onCloseModal(){
    this.closeModal.emit(true);
  }

}
