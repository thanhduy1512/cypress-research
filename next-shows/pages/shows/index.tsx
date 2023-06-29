import styles from '../../styles/Shows.module.css';
import ShowListItem from '@/components/showListItem';

const Shows = () => {
  const arrayShows = [
    { date: 'mon', band: 'abc', description: 'deslorem' },
    { date: 'tue', band: 'abc', description: 'deslorem' },
  ];
  return (
    <div className={styles.showContainer + ' ' + 'container'}>
      <h1>Upcoming Shows</h1>
      <div>
        {arrayShows.map((show) => (
          <div key={show.date}>
            <ShowListItem
              date={show.date}
              band={show.band}
              description={show.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Shows;
