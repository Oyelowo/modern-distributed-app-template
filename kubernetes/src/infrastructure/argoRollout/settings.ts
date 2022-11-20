import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const argoRolloutProvider = getResourceProvider({
    outputDirectory: `infrastructure/argo-rollout`,
    environment: ENVIRONMENT,
});
