import { createArgocdApplication } from '../argocd/createArgoApplication.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const argoEventApplication = createArgocdApplication({
    environment: ENVIRONMENT,
    sourceAppDirectory: 'infrastructure/argo-event',
    outputDirectory: 'infrastructure/argocd-applications-children-infrastructure',
    namespace: 'argo-event',
});
