import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGard } from './auth/auth-gard.service';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGard]
})
export class AppRoutingModule { }
