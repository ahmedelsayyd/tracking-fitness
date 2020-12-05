import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRoot from '../app-state/app.redusers';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGard implements CanActivate, CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<fromRoot.State>) { }


    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1))
        // if (this.authService.isAuth()) return true
        // else this.router.navigate(['/login'])
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth)

        // if (this.authService.isAuth()) return true
        // else this.router.navigate(['/login'])
    }


}