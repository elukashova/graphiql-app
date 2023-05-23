import {
  GraphQLField,
  GraphQLFieldMap,
  GraphQLList,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
} from 'graphql';
import React, { useState } from 'react';
import styles from '../ComponentsSchema.module.css';

export type Data = GraphQLField<unknown, unknown, unknown>;

export interface ListItemProps {
  data: Data;
  getNameData: (data: Data) => void;
  getTypeData: (type: GraphQLOutputType) => void;
}

const ListItem: React.FC<ListItemProps> = ({ data, getNameData, getTypeData }) => {
  const { name, type, args, description } = data;
  const lang = 'en';
  const handleName = () => {
    getNameData(data);
  };

  const handleType = () => {
    getTypeData(type);
  };

  return (
    <>
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
    </>
  );
};

export default ListItem;
