import { gql } from 'apollo-server';

export const ArtistType = gql`
  type Artist {
    name: String
    genres: [String]
  }`