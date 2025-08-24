import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  if(localStorage.getItem('Token') !== null){
    req = req.clone({
      setHeaders : { token : localStorage.getItem('Token')!}
    })
  }

  return next(req);
};
