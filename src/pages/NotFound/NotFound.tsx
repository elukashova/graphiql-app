import React from 'react';
import styles from './NotFound.module.css';
import notFound from '../../assets/auth-background.png';
import { useTranslation } from 'react-i18next';

const NotFound = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <img className={styles.background} src={notFound} alt="" />
      <h2 className={styles.text}>
        {t('notFound.not_found')}
        <br />
        {t('notFound.go')}
        <a href="/" className={styles.highlight}>
          {`${t('notFound.editor')}?`}
        </a>
      </h2>
    </div>
  );
};

export default NotFound;
