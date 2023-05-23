import React from 'react';
import styles from './ButtonLang.module.css';
import { useTranslation } from 'react-i18next';

const ButtonLang = (): JSX.Element => {
  const { i18n } = useTranslation();
  const languages: { en: string; ru: string } = { en: 'en', ru: 'ru' };
  const currentLanguage: string | null = localStorage.getItem('i18nextLng');

  const toggleLanguage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (currentLanguage) {
      case languages.en:
        i18n.changeLanguage(languages.ru);
        break;
      case languages.ru:
        i18n.changeLanguage(languages.en);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles['checkbox-wrapper']}>
      <label className={styles.switch} htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={toggleLanguage}
          checked={currentLanguage === languages.ru}
        />
        <div className={`${styles.slider} ${styles.round}`}></div>
      </label>
    </div>
  );
};

export default ButtonLang;
