import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { ResourceName } from '../../types/ownTypes.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const metalbResourceName: ResourceName = 'metalb';
export const metalbProvider = getResourceProvider({
    outputDirectory: `infrastructure/metalb`,
    environment: ENVIRONMENT,
});
