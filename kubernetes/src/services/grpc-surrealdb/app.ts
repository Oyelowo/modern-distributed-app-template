import { ServiceDeployment } from '../../shared/deployment.ts';
import { grpcSurrealdbSettings } from './settings.ts';

export const grpcSurrealdb = new ServiceDeployment('grpc-surrealdb', grpcSurrealdbSettings);
