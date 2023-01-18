import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

import { AppRouterModule } from './routes/router.module';
import { environment } from '../environments/environment';

// FIREBASE
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFunctions, getFunctions } from '@angular/fire/functions';

/** MAIN ROOT MODULE */
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    CoreModule,
    AppRouterModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
