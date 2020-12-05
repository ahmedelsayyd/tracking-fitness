import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedMoudule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({

    declarations: [
        SignupComponent,
        LoginComponent,
    ],

    imports: [
        SharedMoudule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
        AuthRoutingModule
    ],
    exports: [

    ]
})
export class AuthModule {
}