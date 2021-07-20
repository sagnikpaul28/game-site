const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList, GraphQLSchema, GraphQLNonNull } = require("graphql");

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
        },
        ratings: {
            type: new GraphQLList(GameRatingsType),
            async resolve(parent) {
                return await queries.getRatingsForAGame(parent.id);
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
        },
        featuredImage: {
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

const GameRatingsType = new GraphQLObjectType({
    name: "GameRatings",
    fields: () => ({
        reviewer: {
            type: GraphQLString
        },
        rating: {
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
        },
        allGamesForAGenre: {
            type: new GraphQLList(GameType),
            args: {
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                return await queries.getAllGamesForAGenre(args.genre)
            }
        },
        allGamesForAPlatform: {
            type: new GraphQLList(GameType),
            args: {
                platform: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                return await queries.getAllGamesForAPlatform(args.platform)
            }
        },
        allFeaturedGames: {
            type: new GraphQLList(GameType),
            async resolve() {
                return await queries.getAllFeaturedGames();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addGame: {
            type: GameType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                originalPrice: {
                    type: new GraphQLNonNull(GraphQLFloat)
                },
                discountedPrice: {
                    type: new GraphQLNonNull(GraphQLFloat)
                },
                publisher: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                image: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genres: {
                    type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                },
                images: {
                    type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                },
                platforms: {
                    type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                },
                description: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                releaseDate: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                videoUrl: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                featuredImage: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                reviewers: {
                    type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                },
                ratings: {
                    type: new GraphQLNonNull(new GraphQLList(GraphQLString))
                },
            },
            async resolve(parent, args) {
                return await queries.addGames(args.name, args.originalPrice, args.discountedPrice, args.publisher, args.image, 
                    args.genres, args.images, args.platforms, args.description, args.releaseDate, args.videoUrl, args.featuredImage, 
                    args.reviewers, args.ratings);
            } 
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})