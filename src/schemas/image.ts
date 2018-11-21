import { gql } from 'apollo-server';
export const ImageType = gql`
  type Image {
    height: Int
    url: String
    width: Int
  }`