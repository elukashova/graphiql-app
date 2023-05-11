import { AuthErrors, ErrorMessages } from './Error.types';

export const defineErrorMessage = (errorCode: string): string => {
  let message: string;

  switch (errorCode) {
    case AuthErrors.emailInUse:
      message = ErrorMessages.emailInUse;
      break;
    case AuthErrors.invalidPassword:
      message = ErrorMessages.invalidPassword;
      break;
    case AuthErrors.userNotFount:
      message = ErrorMessages.userNotFount;
      break;
    default:
      message = '';
  }

  return message;
};
