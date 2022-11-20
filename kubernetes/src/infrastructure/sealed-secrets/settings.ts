import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { ResourceName } from '../../types/ownTypes.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const sealedSecretsResourceName: ResourceName = 'sealed-secrets';
export const sealedSecretsProvider = getResourceProvider({
    outputDirectory: `infrastructure/sealed-secrets`,
    environment: ENVIRONMENT,
});
