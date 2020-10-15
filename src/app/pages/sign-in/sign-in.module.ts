import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  { path: '', component: SignInComponent }
];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SignInModule { }
