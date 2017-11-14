/**
 * created by NasskalteJuni
 */
import firebase from 'firebase';
import dbConfig from './config.json';

const db = firebase.initializeApp(dbConfig).database();
const songs = db.ref().child('songs');
const prices = db.ref().child('prices');
const auth = firebase.auth();
auth.signInAnonymously().catch(console.warn);

export default db;
export {auth};
export {songs};
export {prices};
