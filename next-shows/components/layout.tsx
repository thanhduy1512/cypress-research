import Link from 'next/link';
import styles from '../pages/Home.module.css';

type LayoutProps = {
  children: React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  const onClickRoute = () => {};
  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navBar}>
          <div className={styles.navBarTitle}>
            <Link href="/">
              <button>Popular Venue Concert</button>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link href="shows">
              <button className={styles.button}>Shows</button>
            </Link>
            <Link href="bands">
              <button className={styles.button}>Bands</button>
            </Link>
            <Link href="signin">
              <button className={styles.button}>Signin</button>
            </Link>
          </div>
        </nav>
        {children}
      </div>
    </>
  );
}
