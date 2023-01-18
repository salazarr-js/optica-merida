import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auth, authState, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth'

import { ROUTES_NAMES } from '@app/routes/routes';
import { Store } from '@ngxs/store';
import { SetLoading } from '@app/core/store/loading';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { first } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  /** */
  constructor(
    private store: Store,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    authState(this.auth)
    .pipe( untilDestroyed(this), first() )
    .subscribe(user => {
      console.warn({user})
      if (user)
        this.router.navigate(['/'])
    });
  }

  /** */
  signIn(): void {
    this.store.dispatch( new SetLoading(true) );

    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then(_ => this.router.navigate(['/', ROUTES_NAMES.CART]))
      .catch(error => console.error(error) )
      .finally(() => this.store.dispatch( new SetLoading(false) ));
  }
}
