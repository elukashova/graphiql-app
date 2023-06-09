import { DefaultTFuncReturn } from 'i18next';
import React, { useState } from 'react';
import styles from './Infocard.module.css';

type Props = {
  title: string;
  text?: DefaultTFuncReturn;
  urls?: string[];
  names?: string[];
};

const InfoCard = ({ title, text, urls, names }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? styles['card-open'] : styles.card} onClick={handleClick}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.triangle}></span>
        </div>
        <div className={`${styles.hidden} ${isOpen ? styles['bottom'] : ''}`}>
          {text && <p className={styles.text}>{text}</p>}
          {urls &&
            names &&
            urls.map((url: string, idx: number) => {
              return (
                <div className={styles.author} key={idx}>
                  <img className={styles.img} src={url} alt={names[idx]} />
                  <p className={styles.name}>{names[idx]}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
