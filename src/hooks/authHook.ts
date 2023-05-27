import { useAppDispatch } from '../store/hooks';
import { setRoute } from '../store/slices/route';
import { AuthHook } from '../pages/Auth/Auth.types';
import { useNavigate } from 'react-router-dom';

const useAuth = (): AuthHook => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleSignUp = (): void => {
    dispatch(setRoute({ isSignUp: true, isSignIn: false }));
    navigate('/signup');
  };

  const toggleSignIn = (): void => {
    dispatch(setRoute({ isSignUp: false, isSignIn: true }));
    navigate('/signin');
  };

  return { toggleSignUp, toggleSignIn };
};

export default useAuth;
