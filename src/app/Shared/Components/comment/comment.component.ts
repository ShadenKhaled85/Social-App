import { AfterViewChecked, Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { CommentsService } from '../../../Core/Services/comments/comments.service';
import { IComment } from '../../Models/icomment';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule , DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})

export class CommentComponent implements OnInit, AfterViewChecked{

  private readonly commentsService = inject(CommentsService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);

  postId : InputSignal<string> = input.required();
  postComments : WritableSignal<IComment[]> = signal([]);
  createCommentForm !: FormGroup;
  updateForm !: FormGroup;
  isDropDownOpen : boolean = false;
  dropdownInitialized = false;

  ngOnInit(): void {
    this.getPostComments();
    this.createCommentForm = this.formBuilder.group({
      content: [null, [Validators.required]],
      post: [this.postId(), [Validators.required]]
    })
    this.submitCreateComment();
  }

  ngAfterViewChecked(): void {
    if (!this.dropdownInitialized && this.postComments().length > 0) {
      initFlowbite();
      this.dropdownInitialized = true;
    }
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
          this.toastrService.success('Comment added', 'Comments', {progressBar:true});
          this.resetCreateForm();
          this.dropdownInitialized = false; // re-run initFlowbite
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  updateComments(){
    // this.commentsService.updateComments()
  }

  deleteComment(){

  }

  resetCreateForm(){
    this.createCommentForm.patchValue({
      content: null
    })
  }

  onOpenDropDown(){
    this.isDropDownOpen = true;
  }

}
