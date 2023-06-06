import { ApolloProvider } from '@apollo/client';
import Head from "next/head";
import Navbar from '../components/navbar/Navbar';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.css'

import withApollo from '../utils/apollo-client';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Head>
        <title>Kindly Search</title>
        <link rel="icon" href="https://www.kindlyimpact.com/images/favicon.png" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default withApollo(MyApp);
