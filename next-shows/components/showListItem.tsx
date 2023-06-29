import styles from '../styles/ShowsListItem.module.css';
interface Props {
  date: string;
  band: string;
  description: string;
}
const ShowListItem = ({ date, band, description }: Props) => {
  return (
    <div className={styles.showListItem}>
      <p>{date}</p>
      <button>Tickets</button>
      <div>
        <h3>{band}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default ShowListItem;
