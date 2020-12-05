import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app-state/app.redusers';

import * as UI from '../shared/ui-statement/ui.actions';
import * as authActions from './auth.actions'

@Injectable()
export class AuthService {
    //authChange = new Subject<boolean>()
    //isAuthenticated: boolean
    user: User


    constructor(
        private router: Router,
        private auth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>) { }

    initAuthListner() {
        this.auth.authState.subscribe(user => {
            if (user) {
                //this.isAuthenticated = true
                //this.authChange.next(true)
                this.store.dispatch(authActions.setAuthenticated())
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelFbSubscription()
                //this.isAuthenticated = false
                //this.authChange.next(false)
                this.store.dispatch(authActions.setUnauthenticated())

                this.router.navigate(['/login'])
            }
        })
    }

    registerUser(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true)
        this.store.dispatch(UI.startLoading())


        this.auth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                //this.uiService.loadingStateChanged.next(false)
                this.store.dispatch(UI.stopLoading())

            })
            .catch(error => {
                //this.uiService.loadingStateChanged.next(false)
                this.store.dispatch(UI.stopLoading())

                this.uiService.showSnackBar(error.message, null, 3000)

            })

    }

    logIn(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true)
        this.store.dispatch(UI.startLoading())


        this.auth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                //this.uiService.loadingStateChanged.next(false)
                this.store.dispatch(UI.stopLoading())



            })
            .catch(error => {
                //this.uiService.loadingStateChanged.next(false)
                this.store.dispatch(UI.stopLoading())

                this.uiService.showSnackBar(error.message, null, 3000)


            })
    }

    logOut() {
        this.auth.auth.signOut()
    }


    // isAuth() {
    //     return this.isAuthenticated
    // }
}