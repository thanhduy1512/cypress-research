import { useEffect, useState } from 'react';
import styles from '../../styles/Shows.module.css';
import ShowListItem from '@/components/showListItem';

interface Show {
  id: number;
  scheduledAt: string;
  bandId: number;
  availableSeatCount: number;
  band: {
    id: number;
    name: string;
    description: string;
    image: string;
  };
}
const Shows = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const getShows = async () => {
    fetch('http://localhost:5000/show')
      .then((response) => response.text())
      .then((result) => setShows(JSON.parse(result)))
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <div className={styles.showContainer + ' ' + 'container'}>
      <h1>Upcoming Shows</h1>
      <div>
        {shows.map((show) => (
          <div key={show.id}>
            <ShowListItem
              date={show.scheduledAt}
              band={show.band.name}
              availableSeatCount={show.availableSeatCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Shows;
