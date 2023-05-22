import React from 'react';
import InfoCard from './Infocard/Infocard';
import styles from './Welcome.module.css';
import url1 from '../../assets/nastya.jpg';
import url2 from '../../assets/elena.jpg';
import url3 from '../../assets/karina.jpg';
import { useTranslation } from 'react-i18next';

const WelcomePage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h2 className={styles.title}>{t('home.welcome')}</h2>
          <h2 className={styles.name}>GraphiQL</h2>
        </div>
        <div className={styles.bottom}>
          <InfoCard title={`${t('home.what')}?`} text={t('home.what_text')} />
          <InfoCard
            title={`${t('home.who')}?`}
            urls={[url1, url2, url3]}
            names={[t('home.who_nastya'), t('home.who_lena'), t('home.who_karina')]}
          />
          <InfoCard title={`${t('home.why')}?`} text={t('home.why_text')} />
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
