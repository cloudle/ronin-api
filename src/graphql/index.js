import typeDefs from './schema';
import Query from './query';
import Mutation from './mutation';
import User from './types/User';
import { env, } from '../shared';

/* notice: this function run for both simulated Express and Aws Lambda
** use [event, context] for Lambda and [req] for Express */
export const graphQlContext = ({ event, context, req, }) => {
	const headers = event?.headers || req?.headers || {};
	const authorization = headers['Authorization'] || headers['authorization'];
	const userId = authorization?.substring?.(7);

	return {
		user: {
			id: userId,
		}
	};
};

export const resolvers = {
	Query,
	Mutation,
	User,
};

export const apolloConfigs = {
	typeDefs,
	resolvers,
	context: graphQlContext,
	playground: {
		endpoint: env.isLambda ? `/${env.stage}/graphql` : '/graphql',
	},
};
