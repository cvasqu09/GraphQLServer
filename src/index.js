const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const util = require('util');
require('dotenv').config();

const bearerToken = process.env.BEARER_TOKEN;

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type Playlist {
    name: String!
    images: [Image]
    tracks: [Track]
  }

  type Image {
    height: Int
    url: String
    width: Int
  }

  type Track {
    name: String!
    popularity: Int
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    playlists: [Playlist]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.
const resolvers = {
  Playlist: {
    async tracks() {
      const instance = axios.create({
        baseURL: 'https://api.spotify.com',
        headers: {'Authorization': 'Bearer ' + bearerToken}
      })
    }
  },

  Query: {
    async playlists() {
      console.log(bearerToken);
      const instance = axios.create({
        baseURL: 'https://api.spotify.com',
        headers: {'Authorization': 'Bearer ' + bearerToken}
      })
      const result = await instance.get('/v1/me/playlists');
      return result.data.items;
    }
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});