import { useState, useEffect } from 'react';
import styles from './Bands.module.css';

interface Band {
  id: number;
  name: string;
  description: string;
  image: string;
}
const Bands = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const getShows = async () => {
    fetch('http://localhost:5000/band')
      .then((response) => response.text())
      .then((result) => setBands(JSON.parse(result)))
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    getShows();
  }, []);
  return (
    <div className={styles.container}>
      <h1>Our Illustrious Performers</h1>
      {bands.map((band) => (
        <div className={styles.bandContainer} key={band.id}>
          <h2>{band.name}</h2>
          <p>{band.description}</p>
        </div>
      ))}
    </div>
  );
};
export default Bands;
