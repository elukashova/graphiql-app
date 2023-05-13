export interface UserData {
  email: string;
  password: string;
}

export type AuthHook = {
  toggleSignUp: () => void;
  toggleSignIn: () => void;
};
