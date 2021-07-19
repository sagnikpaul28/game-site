const mysql = require("mysql");

const CONNECT_TO_DB = "USE game_site";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password"
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
                    videoUrl: item.video_url
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

module.exports = {
    connectToDb,
    useGameDatabase,
    getGenresForAGame,
    getDetailsForAGame,
    getPlatformsForAGame,
    getAllGamesRootQuery,
    getAllGenresRootQuery,

}