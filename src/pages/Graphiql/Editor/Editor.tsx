import React from 'react';
import styles from './Editor.module.css';

const Editor = (): JSX.Element => {
  return (
    <section className={`panel ${styles.editorWrapper}`}>
      <textarea
        defaultValue={`query {\n  test {\n    id\n  }\n}`}
        className={`panel ${styles.textarea}`}
      ></textarea>
    </section>
  );
};

export default Editor;
