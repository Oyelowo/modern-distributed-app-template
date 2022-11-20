import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const nginxIngressProvider = getResourceProvider({
    outputDirectory: `infrastructure/nginx-ingress`,
    environment: ENVIRONMENT,
});
