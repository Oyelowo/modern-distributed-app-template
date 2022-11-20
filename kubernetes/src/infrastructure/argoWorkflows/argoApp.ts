import { createArgocdApplication } from '../argocd/createArgoApplication.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const argoWorkflowsApplication = createArgocdApplication({
    environment: ENVIRONMENT,
    sourceAppDirectory: 'infrastructure/argo-workflows',
    outputDirectory: 'infrastructure/argocd-applications-children-infrastructure',
    namespace: 'argo-workflows',
});
