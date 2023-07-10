import Link from 'next/link';
import styles from '../styles/ShowsListItem.module.css';
interface Props {
  showId: number;
  date: string;
  band: string;
  availableSeatCount: number;
}
const ShowListItem = ({ showId, date, band, availableSeatCount }: Props) => {
  return (
    <div className={styles.showListItem}>
      <p>{new Date(date).toUTCString()}</p>
      <Link href={`/shows/${showId}`}>
        <button>Tickets</button>
      </Link>
      <div>
        <h3>{band}</h3>
        <p>{availableSeatCount}</p>
      </div>
    </div>
  );
};
export default ShowListItem;
