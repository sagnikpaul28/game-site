import { gql } from "apollo-boost";

export const getFeaturedGames = gql`
  {
    allFeaturedGames {
      id,
      name,
      details {
        featuredImage
      }
    }
  }
`;

export const getLatestGames = gql`
  {
    latestGames {
      id,
      name,
      image,
      discountedPrice
    }
  }
`

export const getLatestGame = gql`
  {
    latestGame {
      id,
      name, 
      genres,
      images,
      details {
        description,
        releaseDate,
        videoUrl
      }
    }
  }
`

export const getAllGames = gql`
  {
    games {
      id,
      name,
      # originalPrice,
      # discountedPrice,
      # publisher,
      # image,
      # genres,
      # platforms,
      # details,
      # ratings,
      # images
    }
  }
`;