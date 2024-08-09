import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    tracksForHome: [Track!]
    track(id: ID!): Track
  }

  type Track {
    id: ID!
    title: String!
    author: Author!
    thumbnail: String
    length: Int
    modulesCount: Int
    description: String
    numberOfViews: Int
    modules: [Module!]!
  }

  type Module {
    id: ID!
    title: String!
    length: Int
  }

  type Author {
    id: ID!
    name: String!
    photo: String
  }

  type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse! 
  }

  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
  }
`;