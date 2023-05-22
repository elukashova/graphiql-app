import React, { useState } from 'react';
import { OnSelectRoot } from '../Schema/types/onSelect';
import styles from '../ComponentsSchema.module.css';
import {
  GraphQLInputType,
  GraphQLNamedType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLSchema,
  IntrospectionSchema,
} from 'graphql';
import ListItem from '../Schema/ListItem';

interface SchemaRootProps {
  schema: GraphQLSchema;
  onSelect: OnSelectRoot;
}

/* type FieldType = GraphQLObjectType | GraphQLScalarType;

type ArgType = GraphQLInputType | FieldType | GraphQLNonNull<ArgType>;

type DefaultValue = string | number | boolean | null;

interface GraphQLArgumentData {
  name: string;
  type: ArgType;
  defaultValue?: DefaultValue;
}

export interface ListItemData {
  name: string;
  type: FieldType;
  args: GraphQLArgumentData[];
  description: string;
}
 */
export const SchemaRoot: React.FC<SchemaRootProps> = ({ schema }) => {
  const queryType = schema.getQueryType() as GraphQLObjectType;

  console.log(schema, queryType);
  const [showFields, setShowFields] = useState(false);
  const fields = queryType.getFields();

  const handleQueryTypeClick = () => {
    setShowFields(!showFields);
  };

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
            <ul>
              {Object.keys(fields).map((fieldName) => (
                <li key={fieldName}>
                  <ListItem data={fields[fieldName]} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

/* <ListItem key={queryType.name} props={fields} /> */

/* interface SchemaRootProps {
  schema: GraphQLSchema;
  onSelect: OnSelectRoot;
}

export const SchemaRoot: React.FC<SchemaRootProps> = ({ onSelect, schema }) => {
  console.log(schema.name);

  return (
    <div>
      <h4>Root Types:</h4>
      <div>
        <p className={styles.query}>
          query:
          <span className={styles.title} onClick={() => onSelect(schema)}>
            {schema}
          </span>
        </p>
      </div>
    </div>
  );
}; */
