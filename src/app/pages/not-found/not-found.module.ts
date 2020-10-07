import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: '', component: NotFoundComponent }
];

/** 404 NOT FOUND PAGE LAZY MODULE */
@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }
