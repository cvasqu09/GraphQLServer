"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.ArtistType = apollo_server_1.gql `
  type Artist {
    name: String
    genres: [String]
  }`;
