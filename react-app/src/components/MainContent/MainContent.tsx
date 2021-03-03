import React from 'react';
import { Aside } from '../aside/aside';
import styles from './MainContent.module.css';

export function MainContent() {
  return (
    <main className={styles.root}>
      <Aside></Aside>
      <div></div>
    </main>
  );
}
