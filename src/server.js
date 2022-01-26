const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
const { ApolloServer } = require("apollo-server");

const typeDefs = require('./graphql/typeDefs');

require('dotenv').config();


const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'letmein'
    )
)

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const host = process.env.GRAPHQL_HOST || '127.0.0.1'
const port = process.env.GRAPHQL_PORT || 4000
const endpoint = process.env.GRAPHQL_ENDPOINT || '/graphql'

const server = new ApolloServer({
    schema: neoSchema.schema,
    context: ({ req }) => ({ req }),
});

server.listen({host,port,endpoint}).then(({url}) => console.log(`🔥 Server running at http://${host}:${port}${endpoint}`));