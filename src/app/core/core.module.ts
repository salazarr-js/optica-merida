/** ANGULAR */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/** MODULES & THIRDS */
import { CoreMaterialModule } from './core-material.module';
import { StoreModule } from '@store/store.module';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
/** DECLARABLES */
import { CORE_COMPONENTS } from './components';
import { CORE_DIRECTIVES } from './directives';
/** SERVICES */
import { CORE_SERVICES } from './services';

/** ALL CORE `components`, `directives`, `pipes` TO DECLARE */
const coreDeclarables = [
  CORE_COMPONENTS,
  CORE_DIRECTIVES,
];


/** CORE MODULE*/
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,

    CoreMaterialModule,
    StoreModule,

    SweetAlert2Module.forRoot()
  ],
  declarations: [ coreDeclarables ],
  exports: [
    RouterModule,
    CoreMaterialModule,

    coreDeclarables
  ],
  providers: [
    CORE_SERVICES,
    // { provide: 'window', useFactory: () => window }, // A PROVIDER FOR WINDOW OBJECT
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
