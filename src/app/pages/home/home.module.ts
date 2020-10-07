import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

/** HOME PAGE LAZY MODULE */
@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
