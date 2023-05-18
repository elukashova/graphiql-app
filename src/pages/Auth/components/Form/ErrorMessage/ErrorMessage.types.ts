export enum FirebaseErrors {
  emailInUse = 'Email is already in use',
  userNotFount = "Email doesn't exist",
  invalidPassword = 'Invalid password',
  genericMessage = 'Something went wrong. Please, retry',
}

export const ValidationErrors = {
  email: 'Please, provide a valid email',
  passwordLength: 'The password must be at least 8 characters long',
  passwordLetters: 'The password must contain at least 1 letter',
  passwordDigit: 'The password must contain at least 1 digit',
  passwordSpecialChar: 'The password must contain at least 1 special character',
  emptyEmail: 'Please, provide a valid email',
  emptyPassword: 'Please, provide a valid password',
};
