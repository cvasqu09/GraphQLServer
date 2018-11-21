"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require('apollo-server');
exports.PlaylistType = gql `
  type Playlist {
    name: String!
    images: [Image]
    tracks: [Track]
  }`;
