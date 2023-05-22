// import { getIntrospectionQuery, IntrospectionSchema } from 'graphql/utilities';
import React from 'react';
import styles from './Docs.module.css';
import book from '../../../assets/book.svg';

import useDocs from '../../../hooks/docsHook';
// import { useAppSelector } from '../../../store/hooks';
// import { selectDocs } from '../../../store/slices/docs';

const Docs: React.FC = (): JSX.Element => {
  // const apiUrlFromStorage: string =
  //   localStorage.getItem('apiUrl') || 'https://rickandmortyapi.com/graphql';
  // // метод запрашивает схему апи, которая была прописана в инпуте
  // const fetchSchema = () => {
  //   const query: string = getIntrospectionQuery(); // graphQL-запрос для получения схемы
  //   fetch(apiUrlFromStorage, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //     body: JSON.stringify({ query }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setSchema(result.data.__schema);
  //     });
  //   // const schemaJSON: { data: IntrospectionQuery } = await result.json();
  //   // console.log('schemaJSON', schemaJSON.data.__schema); // выводит в формате json
  //   // const schema: GraphQLSchema = buildClientSchema(schemaJSON.data);
  //   // console.log('schema', schema); // а тут схема в формате, с которым (судя по всему) тебе надо будет работать
  //   // console.log(schema.getQueryType()?.getFields()); // пример пути к description
  //   // const sss = schema.getQueryType()?.getFields();
  //   // return sss;
  // };

  const { toggleDocs } = useDocs();
  // // fetchSchema(); // вывела для проверки
  // const handleClick = () => {
  //   if (!isDocs) fetchSchema();
  //   toggleDocs();
  // };

  return (
    <div className={styles['docs-container']}>
      <button className={`${styles.docs}`} type="button" onClick={toggleDocs}>
        <img className={styles.book} src={book} alt="Documents" title="Docs" />
      </button>
    </div>
  );
};

export default Docs;
