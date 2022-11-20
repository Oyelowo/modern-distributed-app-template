import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const veleroProvider = getResourceProvider({
    outputDirectory: `infrastructure/velero`,
    environment: ENVIRONMENT,
});
