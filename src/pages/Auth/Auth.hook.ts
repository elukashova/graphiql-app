import { useAppDispatch } from '../../store/hooks';
import { setRoute } from '../../store/slices/route';
import { AuthHook } from './Auth.types';

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
