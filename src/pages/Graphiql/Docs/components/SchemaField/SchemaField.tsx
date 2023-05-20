import { IntrospectionField, IntrospectionInputTypeRef, IntrospectionOutputTypeRef } from 'graphql';
import React from 'react';
import styles from '../ComponentsSchema.module.css';

export const FieldType: React.FC<{
  type: IntrospectionOutputTypeRef | IntrospectionInputTypeRef;
}> = ({ type }) => {
  if (type.kind === 'NON_NULL') {
    return (
      <span>
        <span className={styles.type}>{<FieldType type={type.ofType} />}</span>!
      </span>
    );
  }

  if (type.kind === 'LIST') {
    return (
      <span>
        [<span className={styles.type}>{<FieldType type={type.ofType} />}</span>]
      </span>
    );
  }

  return <span className={styles.type}>{type.name}</span>;
};

export const SchemaField: React.FC<{ field: IntrospectionField }> = ({ field }) => {
  return (
    <>
      <div>
        <span className={styles.name}>{field.name}</span>
        <span>
          (
          <span>
            {field.args.map((arg) => (
              <span key={arg.name}>
                <span className={styles.arg}>{arg.name}</span>: {<FieldType type={arg.type} />}{' '}
                {arg.defaultValue == null ? '' : ' = ' + arg.defaultValue}
              </span>
            ))}
          </span>
          )
        </span>
        <span>
          :{' '}
          <span className={styles.type}>
            <FieldType type={field.type} />
          </span>
        </span>
      </div>
      <span>{field.description}</span>
    </>
  );
};
