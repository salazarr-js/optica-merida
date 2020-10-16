/** ANGULAR */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

/** MODULES & THIRDS */
import { CoreMaterialModule } from './core-material.module';
import { StoreModule } from '@store/store.module';
/** FIREBASE */
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
/** DECLARABLES */
import { CORE_COMPONENTS } from './components';
import { CORE_DIRECTIVES } from './directives';
/** SERVICES */
import { CORE_SERVICES } from './services';
/** */
import { environment as env } from '@env/environment';

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
    HttpClientModule,

    CoreMaterialModule,
    StoreModule,

    AngularFireModule.initializeApp(env.firebase),
    AngularFireAuthModule,
    
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
