import { gql } from 'apollo-server';

export const TrackType = gql`
  type Track {
    name: String!
    popularity: Int
    artists: [Artist]
  }`