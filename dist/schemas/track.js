"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.TrackType = apollo_server_1.gql `
  type Track {
    name: String!
    popularity: Int
    artists: [Artist]
  }`;
