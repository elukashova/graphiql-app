import React, { useEffect, useState } from 'react';
import styles from '../ComponentsSchema.module.css';
import {
  GraphQLField,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLSchema,
} from 'graphql';
import ListItem, { Data } from '../Schema/ListItem';

interface SchemaRootProps {
  schema: GraphQLSchema;
}

export const SchemaRoot: React.FC<SchemaRootProps> = ({ schema }) => {
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

  useEffect(() => {
    console.log('showName:', showName);
    console.log('showType:', showType);
  }, [showName, showType]);

  return (
    <div className={styles.schema}>
      <div>
        <h4>Root Types:</h4>
        <p className={styles.query}>
          query:
          <span className={styles.title} onClick={handleQueryTypeClick}>
            {queryType.name}
          </span>
        </p>
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
                    getTypeData={handleTypeClick}
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
            {console.log(nameData)}
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
          <h4>{typeData.toString()}</h4>
          {typeData instanceof GraphQLNonNull && typeData.ofType instanceof GraphQLObjectType && (
            <>
              {typeData.ofType.description && (
                <span>{JSON.parse(typeData.ofType.description ?? '{}')?.[schemaLang]}</span>
              )}
              <ul>
                {Object.values(typeData.ofType.getFields()).map((field) => (
                  <li className={styles['arg-list']} key={field.name}>
                    <span className={styles.arg}>{field.name}</span>
                    <span className={styles.type}>({field.type.toString()})</span>{' '}
                    <span className={styles.description}>
                      {JSON.parse(field.description || '{}')?.[schemaLang]}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};
