import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (
  req.url.includes("cart") ||
  req.url.includes("wish") ||
  req.url.includes("address") ||
  req.url.includes("orders")
) {
  const token = localStorage.getItem("token");
  if (token) {
    req = req.clone({
      setHeaders: {
        token: token,
      },
    });
  }
}

 
  return next(req);
};
