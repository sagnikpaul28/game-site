const mysql = require("mysql");

const CONNECT_TO_DB = "USE game_site";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    multipleStatements: true
});

const connectToDb = function() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!"); 
    });
}

const useGameDatabase = function() {
    con.query(CONNECT_TO_DB, function (error) {
        if (error) throw error;
    });
}

const getGenresForAGame = async function(gameId) {
    let promise = new Promise((resolve, reject) => {
        con.query(`SELECT genre FROM game_genres WHERE game_id = ${gameId}`, function(error, results) {
            if (error) reject(new Error(error));
            resolve(results.map(item => item.genre))
        })
    });
    return await promise;
}

const getDetailsForAGame = async function(gameId) {
    let promise = new Promise((resolve, reject) => {
        con.query(`SELECT description, release_date, video_url FROM game_details WHERE game_id = ${gameId}`, function(error, results) {
            if (error) reject(new Error(error));
            resolve(results.map(item => {
                return {
                    description: item.description,
                    releaseDate: item.release_date,
                    videoUrl: item.video_url,
                    featuredImage: item.featured_image
                }
            })[0])
        })
    });
    return await promise;
}

const getPlatformsForAGame = async function(gameId) {
    let promise = new Promise((resolve, reject) => {
        con.query(`SELECT platform FROM game_platforms WHERE game_id = ${gameId}`, function(error, results) {
            if (error) reject(new Error(error));
            resolve(results.map(item => item.platform));
        })
    });
    return await promise;
}

const getRatingsForAGame = async function(gameId) {
    let promise = new Promise((resolve, reject) => {
        con.query(`SELECT reviewer, rating FROM game_ratings WHERE game_id = ${gameId}`, function(error, results) {
            if (error) reject(new Error(error));
            resolve(results);
        })
    });
    return await promise;
}

const getAllGamesRootQuery = async function() {
    let promise = new Promise((resolve, reject) => {
        con.query("SELECT * FROM games", function(error, results) {
            if (error) reject(new Error(error));
            resolve(results)
        })
    });
    return await promise;
}

const getAllGenresRootQuery = async function() {
    let promise = new Promise((resolve, reject) => {
        con.query("SELECT DISTINCT genre FROM game_genres", function(error, results) {
            if (error) reject(new Error(error));
            resolve(results)
        })
    });
    return await promise;
}

const getAllGamesForAPlatform = async function(platform) {
    let promise = new Promise((resolve, reject) => {
        con.query(`SELECT * FROM game_platforms JOIN games ON game_platforms.game_id = games.id WHERE game_platforms.platform = '${platform}'`, function(error, results) {
            if (error) reject(new Error(error));
            resolve(results)
        })
    });
    return await promise;
}

const getAllGamesForAGenre = async function(genre) {
    let promise = new Promise((resolve, reject) => {
        con.query(`SELECT * FROM game_genres JOIN games ON game_genres.game_id = games.id WHERE game_genres.genre = '${genre}'`, function(error, results) {
            if (error) reject(new Error(error));
            resolve(results)
        })
    });
    return await promise;
}

const getAllFeaturedGames = async function() {
    let promise = new Promise((resolve, reject) => {
        con.query("SELECT * FROM game_details JOIN games ON games.id = game_details.game_id WHERE game_details.featured_image <> ''", function(error, results) {
            if (error) reject(new Error(error));
            resolve(results)
        })
    });
    return await promise;
}

const addGames = async function(name, originalPrice, discountedPrice, publisher, image, genres, images, platforms, description, releaseDate, videoUrl, featuredImage, reviewers, ratings) {
    let promise = new Promise((resolve, reject) => {
        con.beginTransaction(function(error) {
            if (error) { 
                reject(new Error(error)) 
            }

            con.query(`INSERT INTO games (name, original_price, discounted_price, publisher, image) VALUES ('${name}', ${originalPrice}, ${discountedPrice}, "${publisher}", "${image}"); \n`, function(error, results) {
                if (error) {
                    return con.rollback(function() {
                        reject(new Error(error));
                    });
                }

                let gameId = results.insertId;
                let insertQuery = '';

                insertQuery += `INSERT INTO game_details (game_id, description, release_date, video_url, featured_image) VALUES (${gameId}, ${con.escape(description)}, DATE('${releaseDate}'), '${videoUrl}', '${featuredImage}'); \n`;

                genres.forEach(genre => {
                    insertQuery += `INSERT INTO game_genres (game_id, genre) VALUES (${gameId}, '${genre}'); \n`;
                });

                images.forEach(image => {
                    insertQuery += `INSERT INTO game_images (game_id, image_url) VALUES (${gameId}, '${image}'); \n`;
                })

                platforms.forEach(platform => {
                    insertQuery += `INSERT INTO game_platforms (game_id, platform) VALUES (${gameId}, '${platform}'); \n`;
                })

                for (let i = 0; i < ratings.length; i++) {
                    insertQuery += `INSERT INTO game_ratings (game_id, reviewer, rating) VALUES (${gameId}, '${reviewers[i]}', '${ratings[i]}'); \n`;
                }

                console.log(insertQuery);

                con.query(insertQuery, function(error, results) {
                    if (error) {
                        return con.rollback(function() {
                            reject(new Error(error));
                        });
                    }

                    con.commit(function(error) {
                        if (error) {
                            reject(new Error(error));
                        }
                        
                        console.log(results);
                        resolve(results);
                    })
                })
            })
        })
    });
    return await promise;
}

module.exports = {
    connectToDb,
    useGameDatabase,
    getGenresForAGame,
    getDetailsForAGame,
    getPlatformsForAGame,
    getRatingsForAGame,
    getAllGamesRootQuery,
    getAllGenresRootQuery,
    getAllGamesForAPlatform,
    getAllGamesForAGenre,
    getAllFeaturedGames,
    addGames
}