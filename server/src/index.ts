import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";

// import { addMocksToSchema } from "@graphql-tools/mock";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { mocks } from "./mocks";
import { resolvers } from "./resolvers";
import { TrackAPI } from "./datasources/track-api";

async function startApolloServer() {
  const server = new ApolloServer({ 
    // schema: addMocksToSchema({
    //   schema: makeExecutableSchema({ typeDefs }),
    //   mocks
    // }),
    typeDefs,
    resolvers
  });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          trackAPI: new TrackAPI({ cache })
        }
      };
    },
    listen: { port: 4010 }
  });

  console.log(`🚀  Server is running! -- 📭  Query at ${url}`)
}

startApolloServer();