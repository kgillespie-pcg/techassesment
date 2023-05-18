import { App } from 'realm-web';
//import router from './router'


const REALM_APP_ID = 'kgillespie-dzybb';

const appConfig = {
  id: REALM_APP_ID,
  timeout: 10000,
};
const realmApp = new App(appConfig);

export {realmApp}



