export const AuthErrors = {
  emailInUse: 'auth/email-already-in-use',
  emptyEmail: 'auth/invalid-email',
  emptyPassword: 'auth/missing-password',
  userNotFound: 'auth/user-not-found',
  invalidPassword: 'auth/wrong-password',
};

export const VALID_EMAIL =
  /^(?!\\.)(?!.*\\.$)(?!.*\\.\\.)([A-Za-z0-9!#$%&'*\\.\\.+-\\/=?^_`{|}~]{2,})@([\w-]+\.)+[a-z]{1,}$/;

export const PASSWORD_LETTERS = /[a-zA-Z]/;
export const PASSWORD_DIGIT = /[0-9]/;
export const PASSWORD_SPECIAL_CHAR = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
