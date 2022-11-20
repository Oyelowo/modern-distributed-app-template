import { getResourceProvider } from '../../shared/directoriesManager.ts';
import { ResourceName } from '../../types/ownTypes.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const tikvOperatorResourceName: ResourceName = 'tikv-operator';
export const tikvOperatorProvider = getResourceProvider({
    outputDirectory: `infrastructure/tikv-operator`,
    environment: ENVIRONMENT,
});
