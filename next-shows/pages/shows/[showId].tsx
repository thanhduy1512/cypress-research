import axios from 'axios';
import { Show } from '.';
import styles from './Shows.module.css';
import { useRouter } from 'next/router';

// export async function getStaticProps({
//   params,
// }: {
//   params: { showId: number };
// }) {
//   const { showId } = params;
//   let show = null;
//   let error = null;
//   try {
//     // for SSG, talk directly to db (no need to go through API)
//     const { data } = await axios.get(`http://localhost:5000/show/${showId}`);
//     show = data;
//   } catch (e) {
//     if (e instanceof Error) error = e.message;
//     if (e && typeof e === 'object' && 'toString' in e) error = e.toString();
//   }
//   return { props: { show, error } };
// }

// export async function getStaticPaths() {
//   const { data } = await axios.get('http://localhost:5000/show');

//   const paths = data.map((show: Show) => ({
//     params: { showId: show.id.toString() },
//   }));

//   // Pre-render only these paths at build time.
//   // { fallback: blocking } means pages for other paths
//   //    get generated at request time (SSR).

//   return { paths, fallback: 'blocking' };
// }

interface Props {
  show: Show;
  error: string;
}
const ReservationPage = ({ show, error }: Props) => {
  const router = useRouter();
  const { showId } = router.query;
  console.log(showId);

  if (error)
    return (
      <div className={styles.container}>
        <h1>{error}</h1>
      </div>
    );
  return <div className={styles.container}>showId</div>;
};
export default ReservationPage;
