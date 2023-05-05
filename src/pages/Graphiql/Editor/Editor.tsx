import React from 'react';
import styles from './Editor.module.css';

const Editor = (): JSX.Element => {
  return (
    <section className={`${styles.editorWrapper}`}>
      <textarea
        defaultValue={`query {\n  test {\n    id\n  }\n}`}
        className={`${styles.textarea}`}
      ></textarea>
    </section>
  );
};

export default Editor;
