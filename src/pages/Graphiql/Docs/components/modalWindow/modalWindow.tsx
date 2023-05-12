import React from 'react';
import styles from './modalWindow.module.css';
import { GraphQLSchema } from 'graphql';

type ModalWindowProps = {
  schema: Promise<GraphQLSchema>;
};

const ModalWindow = ({ schema }: ModalWindowProps) => {
  return <h3 className={styles.docs}>Docs</h3>;
};

export default ModalWindow;
