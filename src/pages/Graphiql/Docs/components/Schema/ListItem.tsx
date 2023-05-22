import { GraphQLField, GraphQLFieldMap, GraphQLObjectType } from 'graphql';
import React from 'react';

interface ListItemProps {
  data: GraphQLField<unknown, unknown, unknown>;
}

const ListItem: React.FC<ListItemProps> = ({ data }) => {
  const { name, type, args, description } = data;
  const lang = 'eng';

  return (
    <div>
      <h5>Name:</h5>
      <p>{name}</p>
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
      {description ? <p>{JSON.parse(description)[lang]}</p> : <p></p>}
    </div>
  );
};

export default ListItem;
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
