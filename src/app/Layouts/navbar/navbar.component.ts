import { Component, inject, Input, input, InputSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../Core/Services/users/users.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private readonly usersService = inject(UsersService);
  isLoggedIn:InputSignal<boolean> = input(true);

  signOut(){
    this.usersService.signOut()
  }

}
