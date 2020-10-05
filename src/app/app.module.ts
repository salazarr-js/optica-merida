import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

import { AppRouterModule } from './routes/router.module';

/** MAIN ROOT MODULE */
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    CoreModule,
    AppRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
