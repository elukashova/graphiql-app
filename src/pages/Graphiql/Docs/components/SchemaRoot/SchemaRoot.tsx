import React from 'react';
import { OnSelectRoot } from '../Schema/types/onSelect';
import styles from '../ComponentsSchema.module.css';

interface Props {
  onSelect: OnSelectRoot;
  name: string;
}

export const SchemaRoot: React.FC<Props> = ({ name, onSelect }) => {
  return (
    <div>
      <div>Root Types</div>
      <div>
        <span className={styles.query}>query: </span>
        <span className={styles.title} onClick={() => onSelect(name)}>
          {name}
        </span>
      </div>
    </div>
  );
};
