import { gql } from '@apollo/client'

export const QUERY = gql`
  query data($offset: Int, $feedType: String) {
    feed(offset: $offset, feedType: $feedType) {
      ... on Announcement {
        id
        type: __typename
        title
        body
        fellowship
        created_ts
      }
      ... on Project {
        id
        type: __typename
        title: name
        body: description
        image_url: icon_url
        created_ts
        users {
          id
          type: __typename
          name
          image_url: avatar_url
        }
      }
      ... on User {
        id
        type: __typename
        title: name
        body: bio
        fellowship
        image_url: avatar_url
        created_ts
        projects {
          id
          type: __typename
          name
          image_url: icon_url
        }
      }
    }
  }
`
