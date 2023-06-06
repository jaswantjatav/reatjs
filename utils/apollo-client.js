import { ApolloClient, InMemoryCache } from '@apollo/client';
import withApollo from 'next-with-apollo';

const GRAPHQL_URL = 'https://graphql.bitquery.io';

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: GRAPHQL_URL,
      cache: new InMemoryCache().restore(initialState || {}),
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'BQY8dklSMNkqQo0x3NbjpyKX9cfTJWoE',
      },
    })
);
