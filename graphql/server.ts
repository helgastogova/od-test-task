import { ApolloServer, gql } from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  type Project {
    id: Int!
    type: String
    name: String!
    description: String!
    icon_url: String!
    created_ts: String!
    users: [User!]!
  }

  type User {
    id: Int!
    type: String
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    created_ts: String!
    projects: [Project!]!
  }

  type Announcement {
    id: Int!
    type: String
    fellowship: String!
    title: String!
    body: String!
    created_ts: String!
  }

  union Feed = Announcement | User | Project

  type Query {
    project(id: Int!): Project!
    user(id: Int!): User!
    announcement(id: Int!): Announcement!
    feed(offset: Int, feedType: String): [Feed!]!
  }
`

export const server = new ApolloServer({ typeDefs, resolvers })
