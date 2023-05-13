import { GraphQLSchema } from 'graphql';
import { buildClientSchema, getIntrospectionQuery, IntrospectionQuery } from 'graphql/utilities';
import React from 'react';
import styles from './Docs.module.css';
import book from '../../../assets/book.svg';

import useDocs from '../../../hooks/docsHook';

const Docs: React.FC = (): JSX.Element => {
  const apiUrlFromStorage: string =
    localStorage.getItem('apiUrl') || 'https://rickandmortyapi.com/graphql';

  // метод запрашивает схему апи, которая была прописана в инпуте
  const fetchSchema = async (): Promise<GraphQLSchema> => {
    const query: string = getIntrospectionQuery(); // graphQL-запрос для получения схемы
    const result: Response = await fetch(apiUrlFromStorage, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ query }),
    });
    const schemaJSON: { data: IntrospectionQuery } = await result.json();
    console.log('schemaJSON', schemaJSON); // выводит в формате json
    const schema: GraphQLSchema = buildClientSchema(schemaJSON.data);
    console.log('schema', schema); // а тут схема в формате, с которым (судя по всему) тебе надо будет работать
    console.log(schema.getQueryType()?.getFields().character.description); // пример пути к description
    return schema;
  };

  fetchSchema(); // вывела для проверки

  const { toggleDocs } = useDocs();
  return (
    <div className={styles['docs-container']}>
      <button className={`${styles.docs}`} type="button" onClick={toggleDocs}>
        <img className={styles.book} src={book} alt="Documents" title="Docs" />
      </button>
    </div>
  );
};

export default Docs;
