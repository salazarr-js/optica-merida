// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ngxsLogger: true,
  
  apiUrl: 'https://61d3baaa466a.ngrok.io/api/',
  emailUrl: 'https://2b85cbef7118.ngrok.io/',
  firebase: {
    projectId: 'slzr-test-api',
    appId: '1:114753889766:web:e9ec29f8d8daf26b9e2227',
    storageBucket: 'slzr-test-api.appspot.com',
    apiKey: 'AIzaSyAXW-x97uAfBh9l-pPvDqdzCABertyNVWo',
    authDomain: 'slzr-test-api.firebaseapp.com',
    messagingSenderId: '114753889766',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
