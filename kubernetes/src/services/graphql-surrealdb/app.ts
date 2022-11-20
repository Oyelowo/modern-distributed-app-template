import { ServiceDeployment } from '../../shared/deployment.ts';
import { graphqlSurrealdbSettings } from './settings.ts';

export const graphqlSurrealdb = new ServiceDeployment('graphql-surrealdb', graphqlSurrealdbSettings);
