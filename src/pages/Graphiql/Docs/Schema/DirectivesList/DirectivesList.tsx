import {
  GraphQLArgument,
  GraphQLDirective,
  GraphQLInputType,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';
import React, { SetStateAction, useState } from 'react';
import styles from '../ComponentsSchema.module.css';

interface DirectivesProps {
  schema: GraphQLSchema;
}

export const DirectivesList: React.FC<DirectivesProps> = ({ schema }) => {
  const [typeDescription, setTypeDescription] = useState<string | null>(null);
  const [prevArgType, setPrevArgType] = useState<GraphQLInputType | undefined>(undefined);

  const handleClick = (argType: GraphQLInputType | undefined) => {
    if (argType instanceof GraphQLNonNull) {
      if (argType.ofType instanceof GraphQLScalarType) {
        if (argType === prevArgType) {
          setTypeDescription(null);
          setPrevArgType(undefined);
        } else {
          setTypeDescription(argType.ofType.description as SetStateAction<string | null>);
          setPrevArgType(argType);
        }
      }
    } else if (argType instanceof GraphQLScalarType) {
      if (argType === prevArgType) {
        setTypeDescription(null);
        setPrevArgType(undefined);
      } else {
        setTypeDescription(argType.description as SetStateAction<string | null>);
        setPrevArgType(argType);
      }
    }
  };

  return (
    <>
      <div className={styles['directives-block']}>
        <div>
          <h4>Directives:</h4>
          <ul className={styles['directives-list']}>
            {schema.getDirectives().map((directive: GraphQLDirective) => (
              <li key={directive.name} className={styles['directives-item']}>
                <p className={styles['directive-name']}>{directive.name}</p>
                <span className={styles['directive-description']}>{directive.description}</span>
                {directive.args && (
                  <ul>
                    {directive.args.map((arg: GraphQLArgument) => (
                      <li key={arg.name}>
                        <span className={styles.arg}>{arg.name}</span>
                        {arg.type && (
                          <>
                            <span
                              className={`${styles['type']}  ${styles['type-description-primitive']}`}
                              onClick={() => handleClick(arg.type)}
                            >
                              {' '}
                              ({arg.type.toString()})
                            </span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {typeDescription && <p className={styles['type-description']}>{typeDescription}</p>}
    </>
  );
};
