import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { ResourceName } from '../../types/ownTypes.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const ciliumResourceName: ResourceName = 'cilium';
export const ciliumProvider = getResourceProvider({
    outputDirectory: `infrastructure/cilium`,
    environment: ENVIRONMENT,
});
