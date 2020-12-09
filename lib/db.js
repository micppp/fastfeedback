import firebase from './firebase';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  if (!uid) return;

  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  return firestore.collection('sites').add(data);
}
