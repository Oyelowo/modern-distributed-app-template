import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { ResourceName } from '../../types/ownTypes.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const seaweedFsResourceName: ResourceName = 'seaweedfs';
export const seaweedFsProvider = getResourceProvider({
    outputDirectory: `infrastructure/seaweedfs`,
    environment: ENVIRONMENT,
});
