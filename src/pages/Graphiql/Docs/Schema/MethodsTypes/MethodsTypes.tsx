import React, { useEffect, useState } from 'react';
import { GraphQLOutputType, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType } from 'graphql';
import styles from '../ComponentsSchema.module.css';
import { Maybe } from 'graphql/jsutils/Maybe';

interface MethodsTypesProps {
  schemaLang: string;
  typeData: GraphQLOutputType;
  handleMethodType: (type: GraphQLOutputType, status: boolean) => void;
}

const MethodsTypes: React.FC<MethodsTypesProps> = ({ schemaLang, typeData, handleMethodType }) => {
  const [showPrimitiveTypeDescription, setShowPrimitiveTypeDescription] = useState(false);
  const [type, setType] = useState<Maybe<string> | null>(null);
  const [showComponent, setShowComponent] = useState(!!typeData);

  useEffect(() => {
    setShowComponent(!!typeData);
    setType(null);
    setShowPrimitiveTypeDescription(false);
  }, [typeData]);

  const handleTypeClick = (type: GraphQLOutputType) => {
    setShowPrimitiveTypeDescription(false);
    if (type instanceof GraphQLScalarType) {
      setShowPrimitiveTypeDescription(true);
      setType(type.description);
    } else if (type instanceof GraphQLNonNull && type.ofType instanceof GraphQLScalarType) {
      setShowPrimitiveTypeDescription(true);
      setType(type.ofType.description);
    } else {
      handleMethodType(type, true);
    }
  };

  return (
    <>
      {showComponent && (
        <div>
          <h4>{typeData.toString()}</h4>
          {typeData instanceof GraphQLNonNull && typeData.ofType instanceof GraphQLObjectType && (
            <>
              {typeData.ofType.description && (
                <span>{JSON.parse(typeData.ofType.description ?? '{}')?.[schemaLang]}</span>
              )}
              <p>Types: </p>
              <ul>
                {Object.values(typeData.ofType.getFields()).map((field) => (
                  <li className={styles['arg-list']} key={field.name}>
                    <>
                      <span className={styles.arg}>{field.name}</span>
                      <span className={styles.type} onClick={() => handleTypeClick(field.type)}>
                        ({field.type.toString()})
                      </span>{' '}
                      <span className={styles.description}>
                        {JSON.parse(field.description || '{}')?.[schemaLang]}
                      </span>
                    </>
                  </li>
                ))}
              </ul>
              {showPrimitiveTypeDescription && <p className={styles['type-description']}>{type}</p>}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MethodsTypes;
