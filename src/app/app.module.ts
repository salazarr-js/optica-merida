import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

import { AppRouterModule } from './routes/router.module';
import { environment } from '../environments/environment';

// FIREBASE
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

/** MAIN ROOT MODULE */
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    CoreModule,
    AppRouterModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
