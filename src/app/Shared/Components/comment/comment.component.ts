import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { CommentsService } from '../../../Core/Services/comments/comments.service';
import { IComment } from '../../Models/icomment';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule , DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})

export class CommentComponent implements OnInit{

  private readonly commentsService = inject(CommentsService);
  private readonly formBuilder = inject(FormBuilder);

  postId : InputSignal<string> = input.required();
  postComments : WritableSignal<IComment[]> = signal([]);
  createCommentForm !: FormGroup;

  ngOnInit(): void {
    this.getPostComments();
    this.createCommentForm = this.formBuilder.group({
      content: [null, [Validators.required]],
      post: [this.postId(), [Validators.required]]
    })
    this.submitCreateComment();
  }

  getPostComments(){
    this.commentsService.getPostComments(this.postId()).subscribe({
      next:(res)=>{
        console.log(res);
        this.postComments.set(res.comments);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  submitCreateComment(){
    if(this.createCommentForm.valid){
      this.commentsService.createComment(this.createCommentForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.postComments.set(res.comments);
          this.resetCreateForm();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  resetCreateForm(){
    this.createCommentForm.patchValue({
      content: null
    })
  }

}
