import { AuthErrors } from '../Form.consts';
import { FirebaseErrors, ValidationErrors } from './ErrorMessage.types';

export const defineErrorMessage = (errorCode: string): string => {
  let message: string;

  switch (errorCode) {
    case AuthErrors.emailInUse:
      message = FirebaseErrors.emailInUse;
      break;
    case AuthErrors.emptyEmail:
      message = ValidationErrors.emptyEmail;
      break;
    case AuthErrors.emptyPassword:
      message = ValidationErrors.emptyPassword;
      break;
    case AuthErrors.invalidPassword:
      message = FirebaseErrors.invalidPassword;
      break;
    case AuthErrors.userNotFount:
      message = FirebaseErrors.userNotFount;
      break;
    default:
      message = '';
  }

  return message;
};
