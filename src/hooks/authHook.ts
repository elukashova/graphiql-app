import { useAppDispatch } from '../store/hooks';
import { setRoute } from '../store/slices/routeSlice';
import { AuthHook } from './hooks.types';

const useAuth = (): AuthHook => {
  const dispatch = useAppDispatch();

  const toggleSignUp = (): void => {
    dispatch(setRoute({ isSignUp: true, isSignIn: false }));
  };

  const toggleSignIn = (): void => {
    dispatch(setRoute({ isSignUp: false, isSignIn: true }));
  };

  return { toggleSignUp, toggleSignIn };
};

export default useAuth;
