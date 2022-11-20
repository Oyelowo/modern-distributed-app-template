import { createArgocdApplication } from '../argocd/createArgoApplication.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const monitoringApplication = createArgocdApplication({
    environment: ENVIRONMENT,
    sourceAppDirectory: 'infrastructure/monitoring',
    outputDirectory: 'infrastructure/argocd-applications-children-infrastructure',
    namespace: 'monitoring',
});
