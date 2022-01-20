const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const path = require('path');

const typeArray = loadFilesSync(path.join(__dirname, 'modules' , '**' ,'*.gql'));

const typeDefs = mergeTypeDefs(typeArray);

module.exports = typeDefs;

// const typeDefs = `
//     type Movie {
//         title: String
//         year: Int
//         imdbRating: Float
//         genres: [Genre] @relationship(type: "IN_GENRE", direction: OUT)
//     }

//     type Genre {
//         name: String
//         movies: [Movie] @relationship(type: "IN_GENRE", direction: IN)
//     }
// `;