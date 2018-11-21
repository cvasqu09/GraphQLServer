import { gql } from 'apollo-server';

export const QueryType = gql`
  type Query {
    playlists: [Playlist]
  }
`