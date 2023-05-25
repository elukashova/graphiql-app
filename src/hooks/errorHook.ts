import { AuthErrors } from '../pages/Auth/components/Form/Form.consts';
import { useTranslation } from 'react-i18next';

export const useErrorMessage = () => {
  const { t } = useTranslation();

  const defineErrorMessage = (errorCode: string): string => {
    let message: string;

    switch (errorCode) {
      case AuthErrors.emailInUse:
        message = t('firebase.email_in_use');
        break;
      case AuthErrors.emptyEmail:
        message = t('validation.empty_email');
        break;
      case AuthErrors.emptyPassword:
        message = t('validation.empty_password');
        break;
      case AuthErrors.invalidPassword:
        message = t('firebase.invalid_password');
        break;
      case AuthErrors.userNotFound:
        message = t('firebase.user_not_found');
        break;
      default:
        message = '';
    }
    return message;
  };

  return { defineErrorMessage };
};

export default useErrorMessage;
