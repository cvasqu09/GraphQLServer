"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.ImageType = apollo_server_1.gql `
  type Image {
    height: Int
    url: String
    width: Int
  }`;
