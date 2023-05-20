import React, { useState } from 'react';
import { IntrospectionSchema, IntrospectionType } from 'graphql';
import { SchemaItem } from '../SchemaItem/SchemaItem';
import { SchemaRoot } from '../SchemaRoot/SchemaRoot';
import { OnSelectItem } from './types/onSelect';
import styles from './Schema.module.css';

interface SchemaInterface {
  schema: IntrospectionSchema;
}

const Schema = ({ schema }: SchemaInterface) => {
  const [docsItems, setDocsItems] = useState<IntrospectionType[]>([]);
  const docItem = docsItems[docsItems.length - 1];
  const ItemType = (name: string) => {
    return schema.types.find((type) => type.name === name);
  };

  const onSelect: OnSelectItem = (item) => {
    console.log('onSelect', item);
  };

  const onSelectRoot = (name: string) => {
    const type = ItemType(name)!;
    setDocsItems([...docsItems, type]);
  };

  return (
    <div className={styles.modal}>
      {docItem ? (
        <SchemaItem item={docItem} onSelect={onSelect} />
      ) : (
        <SchemaRoot name={schema?.queryType.name} onSelect={onSelectRoot} />
      )}
    </div>
  );
};

export default Schema;
