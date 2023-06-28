import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <div className={styles.navBarTitle}>
          <button>Popular Venue Concert</button>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button}>Shows</button>
          <button className={styles.button}>Bands</button>
          <button className={styles.button}>Signin</button>
        </div>
      </nav>
      <div className={styles.background}></div>
    </div>
  );
}
