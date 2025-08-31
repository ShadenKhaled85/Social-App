import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UsersService } from '../../Core/Services/users/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile-photo',
  imports: [],
  templateUrl: './user-profile-photo.component.html',
  styleUrl: './user-profile-photo.component.css'
})
export class UserProfilePhotoComponent {

  private readonly usersService = inject(UsersService);
  private readonly toastrService = inject(ToastrService);

  @Input() isModalOpen : boolean = false;
  @Output() closeModal = new EventEmitter();
  @Output() newProfile  = new EventEmitter();
  newProfileImg : any;

  submitUploadProfilePhoto(){
    let uploadProfilePhotoForm = new FormData();
    uploadProfilePhotoForm.append('photo', this.newProfileImg)
    this.usersService.uploadProfilePhoto(uploadProfilePhotoForm).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastrService.success('Profile photo changed');
        this.newProfile.emit();
        //  Clear Form
        this.newProfileImg = null;
        this.onCloseModal();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onUploadProfilePhoto(e:Event){
    if(e.target !== null){
      let profileImg = e.target as HTMLInputElement;
      this.newProfileImg = profileImg.files![0];
      console.log(this.newProfileImg);
    }
  }

  onCloseModal(){
    this.closeModal.emit(true);
  }
}
