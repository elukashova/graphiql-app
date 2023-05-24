import React, { useState } from 'react';
import { IntrospectionSchema, IntrospectionType } from 'graphql';
import { SchemaRoot } from '../SchemaRoot/SchemaRoot';
import { OnSelectItem } from './types/onSelect';
import styles from './Schema.module.css';
import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

interface SchemaProps {
  schema: GraphQLSchema | null;
}

const Schema: React.FC<SchemaProps> = ({ schema }) => {
  if (!schema) {
    return <div>Schema is not available</div>;
  }
  console.log(schema);
  return (
    <div className={styles.modal}>
      <SchemaRoot schema={schema} />
    </div>
  );
};

export default Schema;
