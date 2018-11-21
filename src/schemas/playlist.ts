const { gql } = require('apollo-server');

export const PlaylistType = gql`
  type Playlist {
    name: String!
    images: [Image]
    tracks: [Track]
  }`