// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlApi: 'http://localhost:5000',
  routes: {
    welcome: '',
    login: '/login',
    introduction: '/introduction',
    tabsHome: '/tabs/home',
    tabsDiami: '/tabs/diami',
    tabsProfile: '/tabs/profile',
    tabsRequests: '/prof/requests',
    tabsHistory: '/prof/history',
    tabsProfProfile: '/prof/prof-profile'
  },
  firebase: {
    apiKey: 'AIzaSyAiKGvWbwjEWAj0PMP4r_7qv0Wn2shSrqs',
    authDomain: 'diami-1bd82.firebaseapp.com',
    databaseURL: 'https://diami-1bd82.firebaseio.com',
    projectId: 'diami-1bd82',
    storageBucket: 'diami-1bd82.appspot.com',
    messagingSenderId: '818124117589',
    appId: '1:818124117589:web:1adbce8ec7e9af67eee6dc',
    measurementId: 'G-78F59BZH3S'
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
