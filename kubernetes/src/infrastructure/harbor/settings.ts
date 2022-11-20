import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const harborProvider = getResourceProvider({
    outputDirectory: `infrastructure/harbor`,
    environment: ENVIRONMENT,
});
