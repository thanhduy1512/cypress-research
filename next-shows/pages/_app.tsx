import { AppProps } from 'next/app';
import '../styles/styles.css';
import Layout from '@/components/layout';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
