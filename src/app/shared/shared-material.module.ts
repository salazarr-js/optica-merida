import { NgModule } from '@angular/core';

import { CoreMaterialModule } from '@app/core/core-material.module';


/** WIDGET MODULE WITH MATERIAL COMPONENTS */
@NgModule({
  exports: [
    CoreMaterialModule,
  ]
})
export class SharedMaterialModule { }
