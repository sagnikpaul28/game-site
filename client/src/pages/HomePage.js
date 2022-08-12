import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import { getFeaturedGames, getLatestGames, getLatestGame } from "../queries/queries";
import HomeSlider from "../components/HomeSlider";
import LatestGames from "../components/LatestGames";
import LatestGame from "../components/LatestGame";
import Subscribe from "../components/Subscribe";

function HomePage(props) {
  return (
    <>
      {props.featuredGames && props.featuredGames.loading ? '' : <HomeSlider featuredGames={props.featuredGames.allFeaturedGames} />}
      {props.latestGames && props.latestGames.loading ? '' : <LatestGames latestGames={props.latestGames.latestGames } />}
      {props.latestGame && props.latestGame.loading ? '' : <LatestGame latestGame={props.latestGame.latestGame[0] } />}
      <Subscribe />
    </>
  )
}

export default compose(
  graphql(getFeaturedGames, { name: 'featuredGames' }),
  graphql(getLatestGames, { name: 'latestGames' }),
  graphql(getLatestGame, { name: 'latestGame'})
)(HomePage)