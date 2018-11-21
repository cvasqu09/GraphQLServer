"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.QueryType = apollo_server_1.gql `
  type Query {
    playlists: [Playlist]
  }
`;
