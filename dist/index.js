"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const query_1 = require("./schemas/query");
const image_1 = require("./schemas/image");
const playlist_1 = require("./schemas/playlist");
const track_1 = require("./schemas/track");
const artist_1 = require("./schemas/artist");
const axios = require('axios');
const util = require('util');
require('dotenv').config();
const bearerToken = process.env.BEARER_TOKEN;
const baseUrl = process.env.BASE_API_URL;
const options = {
    headers: { 'Authorization': 'Bearer ' + bearerToken, 'Content-Type': 'application/json', 'Accept': 'application/json' }
};
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = [playlist_1.PlaylistType, image_1.ImageType, track_1.TrackType, artist_1.ArtistType, query_1.QueryType];
// Resolvers define the technique for fetching the types in the
// schema.
const resolvers = {
    Playlist: {
        tracks: (playlist) => __awaiter(this, void 0, void 0, function* () {
            // const tracksUrl = playlist.tracks.href;
            // const result = await axios.get(tracksUrl, options);
            const result = yield axios.get(`${baseUrl}/tracks`);
            return result.data.items;
        })
    },
    Track: {
        name: (trackItem) => {
            return trackItem.track.name;
        },
        popularity: (trackItem) => {
            return trackItem.track.popularity;
        },
        artists: () => __awaiter(this, void 0, void 0, function* () {
            const result = yield axios.get(`${baseUrl}/artists`);
            console.log(result.data);
            return result.data;
        })
    },
    Query: {
        playlists: function () {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(`${baseUrl}/playlists`);
                const result = yield axios.get(`${baseUrl}/playlists`, options);
                // console.log(result);
                return result.data.items;
            });
        }
    },
};
// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(() => {
    console.log(`🚀  Server ready`);
});
