// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ngxsLogger: true,
  
  apiUrl: 'https://61d3baaa466a.ngrok.io/api/',
  emailUrl: 'https://2b85cbef7118.ngrok.io/',
  
  firebase: {
    apiKey: "AIzaSyDTLDZykHWTh_v5pynRFqnefULu7SfeDnc",
    authDomain: "optica-merida.firebaseapp.com",
    databaseURL: "https://optica-merida.firebaseio.com",
    projectId: "optica-merida",
    storageBucket: "optica-merida.appspot.com",
    messagingSenderId: "971454338692",
    appId: "1:971454338692:web:3ef73f1e630ff44e2a14d1"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
