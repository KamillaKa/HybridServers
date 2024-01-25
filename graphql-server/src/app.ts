require('dotenv').config();
import express, {Request, Response} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {notFound, errorHandler} from './middlewares';
import {MessageResponse} from '@sharedTypes/MessageTypes';
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import typeDefs from './api/schemas/index';
import resolvers from './api/resolvers/mediaResolver';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
<<<<<<< Updated upstream
=======
import {MyContext} from './local-types';
import {authenticate} from './lib/functions';
>>>>>>> Stashed changes

const app = express();

(async () => {
  try {
    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: false,
      }),
    );

    app.get('/', (_req: Request, res: Response<MessageResponse>) => {
      res.send({message: 'Server is running'});
    });

<<<<<<< Updated upstream
    const server = new ApolloServer({
=======
    const server = new ApolloServer<MyContext>({
>>>>>>> Stashed changes
      typeDefs,
      resolvers,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault(),
      ],
    });

    await server.start();

<<<<<<< Updated upstream
    app.use('/graphql', cors(), express.json(), expressMiddleware(server));
=======
    app.use('/graphql', cors(), express.json(), expressMiddleware(server, {
      context: ({req}) => authenticate(req),
    }));
>>>>>>> Stashed changes

    app.use(notFound);
    app.use(errorHandler);
  } catch (error) {
    console.error((error as Error).message);
  }
})();

export default app;
