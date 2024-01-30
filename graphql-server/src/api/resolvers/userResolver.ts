import {User, UserWithNoPassword} from '@sharedTypes/DBTypes';
import {fetchData} from '../../lib/functions';
import {LoginResponse, UserResponse} from '@sharedTypes/MessageTypes';
import { GraphQLError } from 'graphql';
import { MyContext } from '../../local-types';

export default {
  MediaItem: {
    owner: async (parent: {user_id: string}) => {
      const user = await fetchData<UserWithNoPassword>(
        process.env.AUTH_SERVER + '/users/' + parent.user_id,
      );
      return user;
    },
  },
  Query: {
    users: async () => {
      const users = await fetchData<UserWithNoPassword[]>(
        process.env.AUTH_SERVER + '/users',
      );
      return users;
    },
    user: async (_parent: undefined, args: {user_id: string}) => {
      const user = await fetchData<UserWithNoPassword>(
        process.env.AUTH_SERVER + '/users/' + args.user_id,
      );
      return user;
    },
  },
  Mutation: {
    createUser: async (
      _parent: undefined,
      args: {input: Pick<User, 'username' | 'email' | 'password'>},
    ) => {
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(args.input),
        headers: {'Content-Type': 'application/json'},
      };
      const user = await fetchData<UserResponse>(
        process.env.AUTH_SERVER + '/users',
        options,
      );
      return user;
    },
    login: async (
      _parent: undefined,
      args: Pick<User, 'username' | 'password'>,
    ) => {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(args),
      };
      const loginResponse = await fetchData<LoginResponse>(
        process.env.AUTH_SERVER + '/auth/login',
        options,
      );
      return loginResponse;
    },
    updateUser: async (
      _parent: undefined,
      args: { input: User }, context: MyContext
      ) => {
      if (!context.user) {
        throw new GraphQLError('Not authorized', { extensions: { code: 'NOT_AUTHORIZED' } });
      }
      return await updateUser(context.user.user_id, args.input);
    },
    deleteUser: async (_parent: undefined, context: MyContext) => {
      if (!context.user) {
        throw new GraphQLError('Not authorized', { extensions: { code: 'NOT_AUTHORIZED' } });
      }
      return await deleteUser(context.user.user_id);
    },
  },
};
