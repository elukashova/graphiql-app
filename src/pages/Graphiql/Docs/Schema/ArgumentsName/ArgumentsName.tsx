import { GraphQLField, GraphQLOutputType, isNonNullType, isListType } from 'graphql';
import React, { useState } from 'react';
import styles from '../ComponentsSchema.module.css';

const ArgumentsName: React.FC<{
  nameData: GraphQLField<unknown, unknown, unknown>;
  schemaLang: string;
}> = ({ nameData, schemaLang }) => {
  const [showTypeDescription, setShowTypeDescription] = useState(false);
  const [typeDescription, setTypeDescription] = useState('');
  const [type, setType] = useState<GraphQLOutputType>(nameData.type);

  const handleTypeClick = () => {
    setShowTypeDescription(!showTypeDescription);
    if (isNonNullType(type) || isListType(type)) {
      setType(type.ofType);
      setTypeDescription(getTypeDescription(type));
    }
  };

  const getTypeDescription = (type: GraphQLOutputType): string => {
    if (isNonNullType(type)) {
      return getTypeDescription(type.ofType);
    } else if (isListType(type)) {
      return getTypeDescription(type.ofType) + '[]';
    } else {
      return JSON.parse(type.description ?? '{}')?.[schemaLang] ?? '';
    }
  };

  return (
    <div className={styles['arguments']}>
      <>
        <h4>{nameData.name}</h4>
        <span>{JSON.parse(nameData.description ?? '{}')?.[schemaLang]}</span>
        {nameData.args && nameData.args.length === 0 ? (
          <h5>No arguments</h5>
        ) : (
          <>
            <h5>Arguments: </h5>
            <ul className={styles['methods-list']}>
              {nameData.args &&
                nameData.args.map((arg) => (
                  <li className={styles['arg-list']} key={arg.name}>
                    <span className={styles.arg}>{arg.name}</span>
                    <span className={styles.type} onClick={handleTypeClick}>
                      ({arg.type.toString()})
                    </span>{' '}
                    <span className={styles.description}>
                      {JSON.parse(arg.description ?? '{}')?.[schemaLang]}
                    </span>
                  </li>
                ))}
            </ul>
            {showTypeDescription && <p className={styles['type-description']}>{typeDescription}</p>}
          </>
        )}
      </>
    </div>
  );
};

export default ArgumentsName;
