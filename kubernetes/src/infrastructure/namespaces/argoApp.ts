import { createArgocdApplication } from '../argocd/createArgoApplication.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const namespacesArgoApps = createArgocdApplication({
    sourceAppDirectory: 'infrastructure/namespaces',
    outputDirectory: 'infrastructure/argocd-applications-children-infrastructure',
    environment: ENVIRONMENT,
    namespace: 'default',
});
