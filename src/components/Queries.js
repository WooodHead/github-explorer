import { gql } from "apollo-boost";
import { DateTime } from "luxon";

const dt = DateTime.local()
  .minus({ days: 7 })
  .toISODate();

export const home = gql`
  query home {
    search(query: "stars:>300 created:>${dt}", type: REPOSITORY, first: 10) {
      edges {
        node {
          ...Repo
        }
      }
    }
  }

  fragment Repo on Repository {
    nameWithOwner
    shortDescriptionHTML
    owner {
      avatarUrl
    }
    stargazers {
      totalCount
    }
  }
`;

export const search = gql`
  query search(
    $query: String!
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    search(
      query: $query
      after: $after
      before: $before
      type: REPOSITORY
      first: $first
      last: $last
    ) {
      issueCount
      userCount
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ...RepoSearch
        }
      }
    }
  }

  fragment RepoSearch on Repository {
    nameWithOwner
    shortDescriptionHTML
    licenseInfo {
      name
    }
    stargazers {
      totalCount
    }
    owner {
      avatarUrl
      login
    }
    repositoryTopics(first: 5) {
      edges {
        node {
          url
          topic {
            name
          }
        }
      }
    }
  }
`;
