import React from 'react';
import styles from '../ComponentsSchema.module.css';
import { GraphQLField, GraphQLOutputType } from 'graphql';
import ListItem, { Data } from './ListItem/ListItem';

interface MethodListProps {
  fields: Record<string, GraphQLField<unknown, unknown, unknown>>;
  handleNameClick: (data: Data) => void;
  handleTypeClickRecursion: (type: GraphQLOutputType) => void;
}

const MethodList: React.FC<MethodListProps> = ({
  fields,
  handleNameClick,
  handleTypeClickRecursion,
}) => {
  return (
    <div>
      <h4>Method list:</h4>
      <ul className={styles['methods-list']}>
        {Object.keys(fields).map((fieldName) => (
          <li key={fieldName}>
            <ListItem
              data={fields[fieldName]}
              getNameData={handleNameClick}
              getTypeData={handleTypeClickRecursion}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MethodList;
