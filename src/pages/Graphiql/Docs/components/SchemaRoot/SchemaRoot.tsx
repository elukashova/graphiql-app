import { GraphQLObjectType } from 'graphql';
import React from 'react';
import styles from '../ComponentsSchema.module.css';

interface SchemaRootProps {
  queryType: GraphQLObjectType;
  handleQueryTypeClick: () => void;
}

const SchemaRoot: React.FC<SchemaRootProps> = ({ queryType, handleQueryTypeClick }) => {
  return (
    <div className={styles['root-block']}>
      <h4>Root Types:</h4>
      <p className={styles.query}>
        query:{' '}
        <span className={styles.title} onClick={handleQueryTypeClick}>
          {queryType.name}
        </span>
      </p>
    </div>
  );
};

export default SchemaRoot;
