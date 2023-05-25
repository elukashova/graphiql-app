import React, { useState } from 'react';
import styles from './ComponentsSchema.module.css';
import {
  GraphQLField,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';
import { Data } from './MethodList/ListItem/ListItem';
import SchemaRoot from './SchemaRoot/SchemaRoot';
import { DirectivesList } from './DirectivesList/DirectivesList';
import MethodList from './MethodList/MethodList';
import MethodsName from './MethodsName/MethodsName';
import MethodsTypes from './MethodsTypes/MethodsTypes';
import { Maybe } from 'graphql/jsutils/Maybe';

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
  const [prevTypeData, setPrevTypeData] = useState<GraphQLOutputType | null>(null);
  const [typeNotFound, setTypeNotFound] = useState(false);

  const [showTypesFromArgType, setShowTypesFromArgType] = useState(false);
  const [typesFromArgType, setTypesFromArgType] = useState<GraphQLOutputType | null>(null);
  const [showPrimitive, setShowPrimitive] = useState(false);
  const [primitive, setPrimitive] = useState<Maybe<string> | null>(null);

  const fields = queryType.getFields();

  const handleQueryTypeClick = () => {
    setShowFields(!showFields);
    setShowType(false);
    setShowName(false);
    setNameData(null);
    setTypeData(null);
    setShowPrimitive(false);
    setPrimitive(null);
    if (queryType.name === nameData?.name) {
      setTypeData(null);
    }
  };

  const handleNameClick = (data: Data) => {
    if (showType && prevNameData && JSON.stringify(data) === JSON.stringify(prevNameData)) {
      setShowName(true);
      setShowType(false);
      setNameData(data);
    } else if (
      !prevNameData ||
      JSON.stringify(data) !== JSON.stringify(prevNameData) ||
      !nameData
    ) {
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
    } else if (
      !prevTypeData ||
      JSON.stringify(type) !== JSON.stringify(prevTypeData) ||
      !typeData
    ) {
      setShowType(true);
      setShowName(false);
      setTypeData(type);
      setPrevTypeData(type);
    } else {
      setShowType(!showType);
    }
  };

  const handleTypeClickRecursion = (type: GraphQLOutputType) => {
    setTypeNotFound(false);
    setTypeData(null);
    setPrevTypeData(null);
    setTypesFromArgType(null);
    setShowTypesFromArgType(false);
    if (type instanceof GraphQLNonNull) {
      if (type.ofType instanceof GraphQLList) {
        handleTypeClick(type.ofType.ofType);
      } else {
        handleTypeClick(type);
      }
    } else {
      setTypeNotFound(true);
    }
  };

  const handleMethodTypeArgs = (type: GraphQLOutputType, status: boolean) => {
    setTypesFromArgType(type);
    setShowTypesFromArgType(status);
  };

  const handleMethodType = (type: GraphQLOutputType, status: boolean) => {
    if (type instanceof GraphQLNonNull) {
      if (type.ofType instanceof GraphQLScalarType) {
        setShowPrimitive(true);
        setPrimitive(type.ofType.description);
      } else if (type.ofType instanceof GraphQLList || type.ofType instanceof GraphQLObjectType) {
        handleMethodType(type.ofType, status);
      }
    } else if (type instanceof GraphQLList) {
      if (type.ofType instanceof GraphQLNonNull) {
        handleMethodType(type.ofType, status);
      }
    } else {
      handleMethodTypeArgs(type, status);
      setShowPrimitive(false);
      setPrimitive(null);
    }
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
            schemaLang={schemaLang}
          />
        )}
        {showFields && showName && !showType && nameData && nameData.name && (
          <>
            <MethodsName nameData={nameData} schemaLang={schemaLang} />
          </>
        )}
        {showFields && !showName && (
          <>
            {!typeNotFound ? (
              <>
                {typeData && showType && (
                  <MethodsTypes
                    schemaLang={schemaLang}
                    handleMethodType={handleMethodType}
                    typeData={typeData}
                  />
                )}
              </>
            ) : (
              <div>This type has no description.</div>
            )}
          </>
        )}

        {typesFromArgType && showTypesFromArgType && (
          <div>
            <h4>{typesFromArgType.toString()}</h4>
            <>
              {typesFromArgType instanceof GraphQLObjectType && (
                <span>{JSON.parse(typesFromArgType.description ?? '{}')?.[schemaLang]}</span>
              )}
              {typesFromArgType instanceof GraphQLObjectType && (
                <ul>
                  {Object.values(typesFromArgType.getFields()).map((field) => (
                    <li className={styles['arg-list']} key={field.name}>
                      <>
                        <span className={styles.arg}>{field.name}</span>
                        <span
                          className={styles.type}
                          onClick={() => handleMethodType(field.type, true)}
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
              )}
              {showPrimitive && <p className={styles['type-description']}>{primitive}</p>}
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schema;
