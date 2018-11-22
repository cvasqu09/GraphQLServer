import { gql } from 'apollo-server';

export const QueryType = gql`
  type Query {
    playlists: [Playlist]
    getArtist(artistUrl: String): Artist
  }
`