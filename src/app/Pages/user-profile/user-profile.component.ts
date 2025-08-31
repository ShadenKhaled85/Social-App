import { DatePipe } from '@angular/common';
import { IPost } from '../../Shared/Models/ipost';
import { PostsService } from './../../Core/Services/posts/posts.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommentComponent } from "../../Shared/Components/comment/comment.component";
import { initFlowbite } from 'flowbite';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewPostComponent } from '../new-post/new-post.component';
import { UserProfilePhotoComponent } from '../user-profile-photo/user-profile-photo.component';

@Component({
  selector: 'app-user-profile',
  imports: [DatePipe, CommentComponent,NewPostComponent, UserProfilePhotoComponent, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  private readonly postsService = inject(PostsService);
  private readonly toastrService = inject(ToastrService);

  myPosts: IPost[] = [];
  updatedPostContent : string = '';
  updatedPostImage : any;
  isDropDownOpen : boolean = false;
  dropdownInitialized = false;
  isUpdate : boolean = false;
  editingPostId : string = '';
  isUpdateModalOpen : boolean = false;
  isCreatePostModalOpen : boolean = false;
  isChangePhotoModalOpen : boolean = false;

  ngOnInit(): void {
    this.getMyPosts()
  }

  ngAfterViewChecked(): void {
    if (!this.dropdownInitialized && this.myPosts.length > 0) {
      initFlowbite();
      this.dropdownInitialized = true;
    }
  }

  getMyPosts(){
    this.postsService.getMyPosts().subscribe({
      next:(res)=>{
        console.log(res);
        this.myPosts = res.posts.reverse();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  updatePost(postId:string){
    this.isUpdate = true;
    let updatePostForm = new FormData();
    updatePostForm.append('body', this.updatedPostContent)
    updatePostForm.append('image', this.updatedPostImage)
    this.postsService.updatePost(postId, updatePostForm).subscribe({
      next:(res)=>{
        console.log(res);
        this.updatedPostContent = '';
        this.updatedPostImage = null;
        this.toastrService.success('Post updated', 'Posts', {progressBar:true});
        this.onCloseModal();
        this.getMyPosts();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  openEditPost(postId:string){
    this.editingPostId = postId;
    this.isUpdate = true;
    this.isUpdateModalOpen = true;
  }

  isEditing(postId:string) : boolean{
    return this.editingPostId === postId;
  }

  onSavingPostImage(event:Event){
    if(event.target !==null){
      let newFileImg = event.target as HTMLInputElement;
      this.updatedPostImage = newFileImg.files![0];
      console.log(this.updatedPostImage);
    }
  }

  deletePost(postId:string){
    this.postsService.deletePost(postId).subscribe({
      next:(res)=>{
        console.log(res);
        this.getMyPosts();
        this.toastrService.success('Post deleted', 'Posts', {progressBar:true});
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onCloseModal(){
    if(this.isUpdateModalOpen === true){
      this.isUpdateModalOpen = false;
    }
    if(this.isCreatePostModalOpen === true){
      this.isCreatePostModalOpen = false;
    }
    if(this.isChangePhotoModalOpen === true){
      this.isChangePhotoModalOpen = false;
    }
  }

  onChangePhotoModalOpen(){
    this.isChangePhotoModalOpen = true;
  }

  onCreatePostModalOpen(){
    this.isCreatePostModalOpen = true;
  }

}
