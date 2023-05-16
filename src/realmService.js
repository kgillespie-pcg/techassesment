import { App, Credentials } from 'realm-web';
import router from './router'


const REALM_APP_ID = 'kgillespie-dzybb';

const appConfig = {
  id: REALM_APP_ID,
  timeout: 10000,
};
const realmApp = new App(appConfig);

export {realmApp}

export const createUser = async (user) => {

  try {
    await realmApp.emailPasswordAuth.registerUser(user.email, user.password);
    console.log('User registered successfully');

    // Log in the user after successful registration
    const credentials = Credentials.emailPassword(user.email, user.password);
    const userLoggedIn = await realmApp.logIn(credentials);
    console.log('User logged in successfully', userLoggedIn);
    // Redirect to the dashboard route
    router.push({ name: 'dashboard' });
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
export const loginUser = async (user) => {
  //const realmApp = new App(appConfig);

  try {
    const credentials = Credentials.emailPassword(user.email, user.password);
    const userLoggedIn = await realmApp.logIn(credentials);
    console.log('User logged in successfully', userLoggedIn);

    // Redirect to the dashboard route
    router.push({ name: 'dashboard' });
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
export const isAuthenticated = () => {
  const user = realmApp.currentUser;
  return user !== null && !user.isAnonymous;
};


// export const logoutUser = async () => {
//   try {
//     await realmApp.currentUser?.logOut();
//     console.log('User logged out successfully');
//   } catch (error) {
//     console.error('Error logging out:', error);
//   }
// };