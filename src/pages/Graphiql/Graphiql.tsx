import React from 'react';
import styles from './Graphiql.module.css';
import Editor from './Editor/Editor';
import Button from '../../components/Button/Button';

const GraphiqlPage = (): JSX.Element => {
  const handleSubmit = () => {
    console.log('Button submit clicked');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.editorWrapper}>
          <section className={`${styles.editorSection}`}>
            <Editor />
            <section className={`${styles.response}`}>
              <textarea className={`${styles.textarea}`} disabled>
                Best response ever
              </textarea>
            </section>
          </section>
          <button className={`${styles.docs}`} type="button">
            <img
              src="https://img.icons8.com/color/48/null/story-book.png"
              alt="Documents"
              title="Docs"
            />
          </button>
        </div>

        <Button text="Submit" disabled={false} onClick={handleSubmit} />
      </div>

      <aside>
        <section className={`${styles.panel}`}>
          <h2>Variables</h2>
        </section>
        <section className={`${styles.panel}`}>
          <h2>Headers</h2>
        </section>
      </aside>
    </div>
  );
};

export default GraphiqlPage;
