import { GraphQLField, GraphQLFieldMap, GraphQLObjectType } from 'graphql';
import React, { useState } from 'react';
import styles from '../ComponentsSchema.module.css';

interface ListItemProps {
  data: GraphQLField<unknown, unknown, unknown>;
}

interface ListItemProps {
  data: GraphQLField<unknown, unknown, unknown>;
}

const ListItem: React.FC<ListItemProps> = ({ data }) => {
  const { name, type, args, description } = data;
  const lang = 'en';
  const [showNameFields, setShowNameFields] = useState(false);
  const [showTypeFields, setShowTypeFields] = useState(false);

  const handleName = () => {
    setShowNameFields(!showNameFields);
  };

  const handleType = () => {
    setShowTypeFields(!showTypeFields);
  };

  return (
    <>
      <div>
        <p>
          <span className={styles.title} onClick={handleName}>
            {name}
          </span>
          <span className={styles.type} onClick={handleType}>
            ({type.toString()}) |
            {description ? (
              <p className={styles.description}>{JSON.parse(description ?? '{}')?.[lang]}</p>
            ) : null}
          </span>
        </p>
      </div>
      <div>
        {showNameFields && (
          <>
            <h4>Name: {name}</h4>
            {args.length === 0 ? (
              <p>No arguments</p>
            ) : (
              <ul>
                {data.args.map((arg) => (
                  <li key={arg.name}>
                    {arg.name}: {arg.type.toString()}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListItem;

/* <h5>Name:</h5>

      <h5>Type:</h5>
      <p>{type.toString()}</p>
      <h5>Arguments:</h5>
      {args.length === 0 ? (
        <p>No arguments</p>
      ) : (
        <ul>
          {data.args.map((arg) => (
            <li key={arg.name}>
              {arg.name}: {arg.type.toString()}
            </li>
          ))}
        </ul>
      )}
      <h5>Description:</h5>
      {description ? <p>{JSON.parse(description ?? '{}')?.[lang]}</p> : <p></p>} */

/* import { ListItemData } from '../SchemaRoot/SchemaRoot'; */

/* export declare type GraphQLFieldMap<TSource, TContext> = ObjMap<
  GraphQLField<TSource, TContext>
>; */

/* const ListItem: React.FC<GraphQLFieldMap> = () => {
  const lang = 'eng';

  return (
    <div>
      { <h5>Name:</h5>
      <p>{name}</p>
      <h5>Type:</h5>
      <p>{type.toString()}</p>
      <h5>Arguments:</h5>
      {args.length === 0 ? (
        <p>No arguments</p>
      ) : (
        <ul>
          {args.map((arg) => (
            <li key={arg.name}>
              {arg.name}: {arg.type.toString()}
            </li>
          ))}
        </ul>
      )}
      <h5>Description:</h5>
      <p>{JSON.parse(description)[lang]}</p> }
    </div>
  );
};

export default ListItem; */
