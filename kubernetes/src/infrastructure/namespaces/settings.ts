import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const namespacesNamesProvider = getResourceProvider({
    outputDirectory: `infrastructure/namespaces`,
    environment: ENVIRONMENT,
});
