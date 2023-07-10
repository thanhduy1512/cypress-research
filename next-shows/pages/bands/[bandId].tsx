import axios from 'axios';
import { Band } from '.';
import styles from './Bands.module.css';

export async function getStaticProps({
  params,
}: {
  params: { bandId: number };
}) {
  const { bandId } = params;
  let band = null;
  let error = null;
  try {
    // for SSG, talk directly to db (no need to go through API)
    const { data } = await axios.get(`http://localhost:5000/band/${bandId}`);
    band = data;
  } catch (e) {
    if (e instanceof Error) error = e.message;
    if (e && typeof e === 'object' && 'toString' in e) error = e.toString();
  }
  return { props: { band, error } };
}

export async function getStaticPaths() {
  const { data } = await axios.get('http://localhost:5000/band');

  const paths = data.map((band: Band) => ({
    params: { bandId: band.id.toString() },
  }));

  // Pre-render only these paths at build time.
  // { fallback: blocking } means pages for other paths
  //    get generated at request time (SSR).

  return { paths, fallback: 'blocking' };
}

interface Props {
  band: Band;
  error: string;
}
const BandPage = ({ band, error }: Props) => {
  if (error)
    return (
      <div className={styles.container}>
        <h1>{error}</h1>
      </div>
    );
  return (
    <div className={styles.container}>
      <h1>{band.name}</h1>
      <p>{band.description}</p>
      <img src={band.image} alt={band.name} />
    </div>
  );
};
export default BandPage;
