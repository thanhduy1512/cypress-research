import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Bands.module.css';

export interface Band {
  id: number;
  name: string;
  description: string;
  image: string;
}
const Bands = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const [error, setError] = useState<string>('');
  const getShows = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/band');
      setBands(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getShows();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Our Illustrious Performers</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        bands.map((band) => (
          <div className={styles.bandContainer} key={band.id}>
            <Link href={`/bands/${band.id}`}>
              <h2>{band.name}</h2>
            </Link>
            <p>{band.description}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default Bands;
