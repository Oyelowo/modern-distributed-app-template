import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const argoWorkflowsProvider = getResourceProvider({
    outputDirectory: `infrastructure/argo-workflows`,
    environment: ENVIRONMENT,
});
