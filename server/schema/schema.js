const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList, GraphQLSchema } = require("graphql");

const queries = require("../queries/queries");

const GameType = new GraphQLObjectType({
    name: "Games",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        originalPrice: {
            type: GraphQLFloat
        },
        discountedPrice: {
            type: GraphQLFloat
        },
        publisher: {
            type: GraphQLString
        },
        image: {
            type: GraphQLString
        },
        genres: {
            type: new GraphQLList(GraphQLString),
            async resolve(parent) {
                return await queries.getGenresForAGame(parent.id);
            }
        },
        platforms: {
            type: new GraphQLList(GraphQLString),
            async resolve(parent) {
                return await queries.getPlatformsForAGame(parent.id);
            }
        },
        details: {
            type: GameDetailsType,
            async resolve(parent) {
                return await queries.getDetailsForAGame(parent.id);
            }
        }
    })
});

const GameDetailsType = new GraphQLObjectType({
    name: "GameDetails",
    fields: () => ({
        description: {
            type: GraphQLString
        },
        releaseDate: {
            type: GraphQLString
        },
        videoUrl: {
            type: GraphQLString
        }
    })
});

const GameGenresType = new GraphQLObjectType({
    name: "GameGenres",
    fields: () => ({
        genre: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        games: {
            type: new GraphQLList(GameType),
            async resolve() {
                return await queries.getAllGamesRootQuery();
            }
        },
        genres: {
            type: new GraphQLList(GameGenresType),
            async resolve() {
                return await queries.getAllGenresRootQuery();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})