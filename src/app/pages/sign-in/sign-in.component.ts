import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { ROUTES_NAMES } from '@app/routes/routes';
import { Store } from '@ngxs/store';
import { SetLoading } from '@app/core/store/loading';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  /** */
  constructor(
    private store: Store,
    private auth: AngularFireAuth, 
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  /** */
  signIn(): void {
    this.store.dispatch( new SetLoading(true) );

    this.auth.signInWithPopup( new auth.GoogleAuthProvider() )
    .then(user => {
      this.router.navigate(['/', ROUTES_NAMES.CART]);
    }).catch(error => console.error(error) )
    .finally(() => this.store.dispatch( new SetLoading(false) ));
  }
}
