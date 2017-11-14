/**
 * created by NasskalteJuni
 */
import {auth} from './db';

let service = {
  signIn: signIn,
  signOut: signOut,
  isLoggedIn: false,
};

auth.onAuthStateChanged(function(){
  service.isLoggedIn = isLoggedIn();
});

function isLoggedIn(){
  return auth && auth.currentUser && !auth.currentUser.isAnonymous && auth.currentUser.email === 'info@fachschaftmedien.de';
}

function signIn(mail,password){
  return auth.signOut().then(() => {
    return auth.signInWithEmailAndPassword(mail , password)
      .catch((error) => {
        auth.signInAnonymously();
        throw error;
      })
  });
}

function signOut(){
  return auth.signOut().then(() => auth.signInAnonymously());
}

export default service;
