import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if(localStorage.getItem('Token') !== null){
    router.navigate(['timeline'])
    return false;
  }

  else{
    return true;
  }



};
