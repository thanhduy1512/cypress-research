import styles from '../styles/ShowsListItem.module.css';
interface Props {
  date: string;
  band: string;
  availableSeatCount: number;
}
const ShowListItem = ({ date, band, availableSeatCount }: Props) => {
  return (
    <div className={styles.showListItem}>
      <p>{new Date(date).toUTCString()}</p>
      <button>Tickets</button>
      <div>
        <h3>{band}</h3>
        <p>{availableSeatCount}</p>
      </div>
    </div>
  );
};
export default ShowListItem;
