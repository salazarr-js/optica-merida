import { NgModule } from '@angular/core';

// NGXS
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
// ENV
import { environment as env } from '@env/environment';

// STATES
import { CartState } from './cart';
import { LoadingState } from './loading';
import { ProductsState } from './products';

/** DINAMYC NGXS PLUGINS BY ENVIROMENT */
const NGXS_PLUGINS = env.production ? [] : [
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsLoggerPluginModule.forRoot({ disabled: !env.ngxsLogger || false }),
];


/** NGXS MAIN STORE FEATURE MODULE */
@NgModule({
  imports: [
    NgxsModule.forRoot([
      CartState,
      LoadingState,
      ProductsState
    ], { developmentMode: !env.production }),
    NgxsStoragePluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),

    ...NGXS_PLUGINS
  ],
  exports: [ ]
})
export class StoreModule { }
