import Link from 'next/link';
import styles from '../../styles/Shows.module.css';

const Shows = () => {
  return (
    <div className={styles.showContainer + ' ' + 'container'}>
      <h1>Upcoming Shows</h1>
      <ul>
        <li>
          <p>Date</p>
          <Link href="/">
            <button>Tickets</button>
          </Link>
          <p>Description</p>
        </li>
        <li>
          <p>Date</p>
          <Link href="/">
            <button>Tickets</button>
          </Link>
          <p>Description</p>
        </li>
      </ul>
    </div>
  );
};
export default Shows;
