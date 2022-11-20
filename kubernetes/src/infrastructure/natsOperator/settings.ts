import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { ResourceName } from '../../types/ownTypes.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const natsOperatorResourceName: ResourceName = 'nats-operator';
export const natsOperatorProvider = getResourceProvider({
    outputDirectory: `infrastructure/nats-operator`,
    environment: ENVIRONMENT,
});
