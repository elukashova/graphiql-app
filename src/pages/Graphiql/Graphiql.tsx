import React from 'react';
import styles from './Graphiql.module.css';
import Editor from './Editor/Editor';

const GraphiqlPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles['editor-wrapper']}>
          <Editor />
          {/* <section className={`${styles.response}`}>
              <textarea
                className={`${styles.textarea}`}
                disabled
                defaultValue="Best response ever"
              ></textarea>
            </section> */}

          <button className={`${styles.docs}`} type="button">
            <img
              src="https://img.icons8.com/color/48/null/story-book.png"
              alt="Documents"
              title="Docs"
            />
          </button>
        </div>
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
