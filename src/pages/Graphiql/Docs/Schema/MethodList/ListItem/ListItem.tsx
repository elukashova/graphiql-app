import { GraphQLField, GraphQLOutputType } from 'graphql';
import React from 'react';
import styles from '../../ComponentsSchema.module.css';

export type Data = GraphQLField<unknown, unknown, unknown>;

export interface ListItemProps {
  data: Data;
  getNameData: (data: Data) => void;
  getTypeData: (type: GraphQLOutputType) => void;
  schemaLang: string;
}

const ListItem: React.FC<ListItemProps> = ({ data, getNameData, getTypeData, schemaLang }) => {
  const { name, type, description } = data;
  const lang = schemaLang;
  const handleName = () => {
    getNameData(data);
  };

  const handleType = () => {
    getTypeData(type);
  };

  return (
    <>
      {name !== 'node' && (
        <div className={styles['list-block']}>
          <span className={styles.title} onClick={handleName}>
            {name}
          </span>
          <p className={styles['return-value']}>
            Return value:{' '}
            <span className={styles.type} onClick={handleType}>
              {type.toString()}
            </span>
          </p>

          {description ? (
            <span className={styles.description}>{JSON.parse(description ?? '{}')?.[lang]}</span>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ListItem;
