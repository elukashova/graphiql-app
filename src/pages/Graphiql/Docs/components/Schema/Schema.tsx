import React, { useState } from 'react';
import styles from '../ComponentsSchema.module.css';
import {
  GraphQLField,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';
import ListItem, { Data } from '../Schema/ListItem';
import { DirectivesList } from '../SchemaRoot/DirectivesList/DirectivesList';

interface SchemaProps {
  schema: GraphQLSchema;
}

export const Schema: React.FC<SchemaProps> = ({ schema }) => {
  const schemaLang = localStorage.getItem('i18nextLng') || 'en';
  const queryType = schema.getQueryType() as GraphQLObjectType;

  const [showFields, setShowFields] = useState(false);
  const [showName, setShowName] = useState(false);
  const [nameData, setNameData] = useState<GraphQLField<unknown, unknown, unknown> | null>(null);
  const [prevNameData, setNamePrevData] = useState<GraphQLField<unknown, unknown, unknown> | null>(
    null
  );

  const [showType, setShowType] = useState(false);
  const [typeData, setTypeData] = useState<GraphQLOutputType | null>(null);
  const [prevTypeData, setTypePrevData] = useState<GraphQLOutputType | null>(null);

  const [showPrimitiveType, setShowPrimitiveType] = useState(false);
  const [primitiveType, setPrimitiveType] = useState<GraphQLOutputType | null>(null);

  const fields = queryType.getFields();

  const handleQueryTypeClick = () => {
    setShowFields(!showFields);
  };

  const handleNameClick = (data: Data) => {
    if (showType && prevNameData && JSON.stringify(data) === JSON.stringify(prevNameData)) {
      setShowName(true);
      setShowType(false);
      setNameData(data);
    } else if (!prevNameData || JSON.stringify(data) !== JSON.stringify(prevNameData)) {
      setShowName(true);
      setShowType(false);
      setNameData(data);
      setNamePrevData(data);
    } else {
      setShowName(!showName);
    }
  };

  const handleTypeClick = (type: GraphQLOutputType) => {
    if (showName && prevTypeData && JSON.stringify(type) === JSON.stringify(prevTypeData)) {
      console.log(type);
      setShowType(true);
      setShowName(false);
      setTypeData(type);
    } else if (!prevTypeData || type !== prevTypeData) {
      setShowType(true);
      setShowName(false);
      setTypeData(type);
      setTypePrevData(type);
    } else {
      setShowType(!showType);
    }
  };

  const handleTypeClickRecursion = (type: GraphQLOutputType) => {
    setTypeData(null);
    setTypePrevData(null);
    if (type instanceof GraphQLNonNull) {
      if (type.ofType instanceof GraphQLList) {
        handleTypeClick(type.ofType.ofType);
      } else {
        handleTypeClick(type);
      }
    }
  };

  const handleMethodTypeClick = (type: GraphQLOutputType) => {
    if (showName && prevTypeData && JSON.stringify(type) === JSON.stringify(prevTypeData)) {
      setShowPrimitiveType(!showPrimitiveType);
      setPrimitiveType(type);
    } else if (!prevTypeData || type !== prevTypeData) {
      setShowPrimitiveType(!showPrimitiveType);
      setPrimitiveType(type);
    } else {
      setShowPrimitiveType(!showPrimitiveType);
    }
  };

  const handleMethodType = (type: GraphQLOutputType) => {
    if (type instanceof GraphQLNonNull) {
      if (isListOrObjectType(type.ofType)) {
        handleMethodTypeClick(getInnerType(type.ofType));
      } else {
        handleMethodTypeClick(type.ofType);
      }
    } else if (type instanceof GraphQLList) {
      if (isListOrObjectType(type.ofType)) {
        handleMethodTypeClick(getInnerType(type.ofType));
      } else {
        handleMethodTypeClick(type.ofType);
      }
    } else if (type instanceof GraphQLObjectType) {
      handleMethodTypeClick(type);
    }
  };

  const isListOrObjectType = (type: GraphQLOutputType): boolean => {
    return type instanceof GraphQLList || type instanceof GraphQLObjectType;
  };

  const getInnerType = (type: GraphQLOutputType): GraphQLOutputType => {
    if (type instanceof GraphQLList || type instanceof GraphQLNonNull) {
      return getInnerType(type.ofType);
    } else if (type instanceof GraphQLObjectType) {
      return type;
    }
    throw new Error('Invalid type');
  };

  return (
    <div className={styles['schema-block']}>
      <div className={styles.schema}>
        <div className={styles['root-block']}>
          <h4>Root Types:</h4>
          <p className={styles.query}>
            query:{' '}
            <span className={styles.title} onClick={handleQueryTypeClick}>
              {queryType.name}
            </span>
          </p>
          <DirectivesList schema={schema} />
        </div>

        <div>
          {showFields && (
            <>
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
            </>
          )}
        </div>
        {showFields && showName && !showType && nameData && nameData.name && (
          <div>
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
                          <span className={styles.type}>({arg.type.toString()})</span>{' '}
                          <span className={styles.description}>
                            {JSON.parse(arg.description ?? '{}')?.[schemaLang]}
                          </span>
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </>
          </div>
        )}
        {showFields && showType && !showName && typeData && (
          <div>
            <>
              <h4>{typeData.toString()}</h4>

              {typeData instanceof GraphQLNonNull &&
                typeData.ofType instanceof GraphQLObjectType && (
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
                            <span
                              className={styles.type}
                              onClick={() => handleMethodType(field.type)}
                            >
                              ({field.type.toString()})
                            </span>{' '}
                            <span className={styles.description}>
                              {JSON.parse(field.description || '{}')?.[schemaLang]}
                            </span>
                          </>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
            </>
          </div>
        )}

        {showPrimitiveType && primitiveType && (
          <div>
            <h4>{primitiveType.toString()}</h4>
            <>
              {console.log(primitiveType)}

              {primitiveType instanceof GraphQLScalarType && (
                <>{primitiveType && <span>{primitiveType.description ?? ''}</span>}</>
              )}

              {primitiveType instanceof GraphQLObjectType && (
                <>
                  {console.log(primitiveType.description)}
                  {primitiveType && (
                    <span>{JSON.parse(primitiveType.description ?? '{}')?.[schemaLang]}</span>
                  )}
                  <ul>
                    {Object.values(primitiveType.getFields()).map((field) => (
                      <li className={styles['arg-list']} key={field.name}>
                        <>
                          <span className={styles.arg}>{field.name}</span>
                          <span
                            className={styles.type}
                            onClick={() => handleMethodType(field.type)}
                          >
                            ({field.type.toString()})
                          </span>{' '}
                          <span className={styles.description}>
                            {JSON.parse(field.description || '{}')?.[schemaLang]}
                          </span>
                        </>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schema;
