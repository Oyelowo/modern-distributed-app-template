import { createArgocdApplication } from '../argocd/createArgoApplication.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const ingressControllerApplication = createArgocdApplication({
    sourceAppDirectory: 'infrastructure/nginx-ingress',
    outputDirectory: 'infrastructure/argocd-applications-children-infrastructure',
    environment: ENVIRONMENT,
    namespace: 'default',
});
