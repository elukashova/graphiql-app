import {
  GraphQLField,
  GraphQLInputType,
  GraphQLNonNull,
  GraphQLScalarType,
  isScalarType,
} from 'graphql';
import React, { useEffect, useState } from 'react';
import styles from '../ComponentsSchema.module.css';

const MethodsName: React.FC<{
  nameData: GraphQLField<unknown, unknown, unknown>;
  schemaLang: string;
}> = ({ nameData, schemaLang }) => {
  const [showTypeDescription, setShowTypeDescription] = useState(false);
  const [type, setType] = useState<GraphQLInputType | null>(null);
  const [selectedArg, setSelectedArg] = useState<GraphQLInputType | null>(null);
  const [typeDescription, setTypeDescription] = useState<string>('');

  useEffect(() => {
    if (type !== null && isScalarType(type) && type.description) {
      setTypeDescription(type.description);
    } else {
      setTypeDescription('');
    }
  }, [type]);

  useEffect(() => {
    setSelectedArg(null);
    setShowTypeDescription(false);
  }, [nameData]);

  const handleTypeClick = (primitiveType: GraphQLInputType) => {
    if (selectedArg === primitiveType) {
      setSelectedArg(null);
      setShowTypeDescription(false);
    } else {
      setSelectedArg(primitiveType);
      if (isScalarType(primitiveType)) {
        setType(primitiveType);
      } else if (primitiveType instanceof GraphQLNonNull) {
        if (primitiveType.ofType instanceof GraphQLScalarType) {
          setType(primitiveType.ofType);
        }
      } else {
        setType(null);
      }
      setShowTypeDescription(true);
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
                    <span className={styles.type} onClick={() => handleTypeClick(arg.type)}>
                      ({arg.type.toString()})
                    </span>{' '}
                    <span className={styles.description}>
                      {JSON.parse(arg.description ?? '{}')?.[schemaLang]}
                    </span>
                  </li>
                ))}
            </ul>
            {selectedArg !== null && showTypeDescription && type !== null && (
              <p className={styles['type-description']}>{typeDescription}</p>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default MethodsName;
