import React from 'react';
import { IntrospectionType } from 'graphql';
import { OnSelectItem } from '../Schema/types/onSelect';
import { SchemaField } from '../SchemaField/SchemaField';

interface Props {
  item: IntrospectionType;
  onSelect: OnSelectItem;
}

export const SchemaItem: React.FC<Props> = ({ item }) => {
  if (item.kind === 'OBJECT') {
    return (
      <div>
        <div>Fields:</div>
        {item.fields.map((field) => (
          <SchemaField key={field.name} field={field} />
        ))}
      </div>
    );
  }

  return null;
};
