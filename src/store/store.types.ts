import { Auth } from '../auth/auth.types';

export type Route = {
  isSignUp: boolean;
  isSignIn: boolean;
};

export interface AuthState extends Auth {
  isLoading?: boolean;
}
