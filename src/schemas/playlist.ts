const { gql } = require('apollo-server');
const axios = require('axios');
const baseUrl = process.env.BASE_API_URL;


export const PlaylistType = gql`
  type Playlist {
    name: String!
    images: [Image]
    tracks: [Track]
  }`;

export const resolvers = {
  tracks: async(playlist: any) => {
    const result = await axios.get(`${baseUrl}/tracks`);
    return result.data.items;
  }
}