import { ApolloServer } from 'apollo-server';
import { QueryType as Query } from './schemas/query'
import { ImageType } from './schemas/image'
import { PlaylistType } from './schemas/playlist'
import { TrackType } from './schemas/track'
import { ArtistType } from './schemas/artist'
const axios = require('axios');
require('dotenv').config();

const bearerToken = process.env.BEARER_TOKEN;
const baseUrl = process.env.BASE_API_URL
const options = {
  headers: { 'Authorization': 'Bearer ' + bearerToken, 'Content-Type': 'application/json', 'Accept': 'application/json' }
}

const typeDefs = [PlaylistType, ImageType, TrackType, ArtistType, Query];

// Resolvers define the technique for fetching the types in the
// schema.
const resolvers = {
  Playlist: {
     tracks: async(playlist: any) => {
      // const tracksUrl = playlist.tracks.href;
      // const result = await axios.get(tracksUrl, options);
      const result = await axios.get(`${baseUrl}/tracks`);
      return result.data.items;
    }
  },

  Track: {
    name: (trackItem: any) => {
      return trackItem.track.name;
    },
    popularity: (trackItem: any) => {
      return trackItem.track.popularity
    },
    artists: async() => {
      const result = await axios.get(`${baseUrl}/artists`);
      console.log(result.data);
      return result.data
    }
  },

  Query: {
    playlists: async function() {
      console.log(`${baseUrl}/playlists`);
      const result = await axios.get(`${baseUrl}/playlists`, options);
      // console.log(result);
      return result.data.items;
    },

    getArtist: async(parent: any, args: any, context: any, info: any) => {
      console.log('args: ' + JSON.stringify(args.artistUrl));
      const result = await axios.get(args.artistUrl, options);
      return result.data;
    }
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(() => {
  console.log(`🚀  Server ready`);
});