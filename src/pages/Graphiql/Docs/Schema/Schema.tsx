import React, { useState } from 'react';
import styles from './ComponentsSchema.module.css';
import {
  GraphQLField,
  GraphQLInputType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';
import ListItem, { Data } from './MethodList/ListItem/ListItem';
import SchemaRoot from './SchemaRoot/SchemaRoot';
import { DirectivesList } from './DirectivesList/DirectivesList';
import MethodList from './MethodList/MethodList';
import ArgumentsName from './ArgumentsName/ArgumentsName';

interface SchemaProps {
  schema: GraphQLSchema;
}

const Schema: React.FC<SchemaProps> = ({ schema }) => {
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
    setShowType(false);
    setShowName(false);
    setNameData(null);
    setTypeData(null);
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
    setPrimitiveType(null);
    setShowPrimitiveType(false);
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
        <div className={styles['root-and-directives']}>
          <SchemaRoot queryType={queryType} handleQueryTypeClick={handleQueryTypeClick} />
          <DirectivesList schema={schema} />
        </div>
        {showFields && (
          <MethodList
            fields={fields}
            handleNameClick={handleNameClick}
            handleTypeClickRecursion={handleTypeClickRecursion}
          />
        )}
        {showFields && showName && !showType && nameData && nameData.name && (
          <ArgumentsName nameData={nameData} schemaLang={schemaLang} />
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
