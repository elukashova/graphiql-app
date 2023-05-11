import { setIsAuth } from '../store/slices/auth';
import store from '../store/store';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  AuthError,
  User,
} from 'firebase/auth';
import firebaseApp from './firebase.config';

const auth = getAuth(firebaseApp);

export async function signUp(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e as AuthError;
  }

  return { result, error };
}

export async function signIn(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e as AuthError;
  }

  return { result, error };
}

export async function logOut() {
  let result = null;
  let error = null;

  try {
    await signOut(auth);
    result = true as const;
  } catch (e) {
    error = e as AuthError;
  }

  return { result, error };
}

onAuthStateChanged(auth, (user: User | null) => {
  store.dispatch(setIsAuth({ isAuth: !!user, userEmail: user?.email }));
});
