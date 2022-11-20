import { createArgocdApplication } from '../argocd/createArgoApplication.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const veleroApplication = createArgocdApplication({
    environment: ENVIRONMENT,
    sourceAppDirectory: 'infrastructure/velero',
    outputDirectory: 'infrastructure/argocd-applications-children-infrastructure',
    namespace: 'velero',
});
