import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const linkerdProvider = getResourceProvider({
    outputDirectory: `infrastructure/linkerd`,
    environment: ENVIRONMENT,
});

export const linkerdVizProvider = getResourceProvider({
    outputDirectory: `infrastructure/linkerd-viz`,
    environment: ENVIRONMENT,
});
