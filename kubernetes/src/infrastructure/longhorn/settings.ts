import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { ResourceName } from '../../types/ownTypes.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const longhornOperatorResourceName: ResourceName = 'longhorn';
export const longhornOperatorProvider = getResourceProvider({
    outputDirectory: `infrastructure/longhorn`,
    environment: ENVIRONMENT,
});
