import { Injectable } from '@angular/core';

import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

import { AuthService } from '../app/shared/services/auth/impl/authentication.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authToken = this.authService.getToken();

    if (req.url.includes('/login')) {
        return next.handle(req);
    }

    if (authToken) {
            const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        });
        return next.handle(authReq);
    }

    return next.handle(req);
    }

}


