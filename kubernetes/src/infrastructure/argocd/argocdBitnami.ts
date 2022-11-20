import { IArgoCdBitnami } from '../../../generatedHelmChartsTsTypes/argoCdBitnami.ts';
import { annotations } from '../ingress/ingressRules.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces, STORAGE_CLASS } from '../../types/ownTypes.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';
import { argocdProvider } from './settings.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';
import { getIngressUrlHost } from '../ingress/hosts.ts';
import { PlainSecretsManager } from '../../../scripts/utils/plainSecretsManager.ts';
import { INGRESS_CLASSNAME_NGINX } from '../../types/nginxConfigurations.ts';

const { ENVIRONMENT } = getEnvVarsForKubeManifests();
const secrets = new PlainSecretsManager('infrastructure', 'argocd', ENVIRONMENT).getSecrets();
const argocdValuesOld: DeepPartial<IArgoCdBitnami> = {
    config: {
        secret: {
            create: true,
            // TODO: Change
            argocdServerAdminPassword: secrets.ADMIN_PASSWORD,
            annotations: {
                // 'sealedsecrets.bitnami.com/managed': 'true',
            },
        },
    },
    global: {
        storageClass: ENVIRONMENT === 'local' ? '' : STORAGE_CLASS,
    },
    server: {
        ingress: {
            enabled: true,
            hostname: getIngressUrlHost({ environment: ENVIRONMENT, subDomain: 'argocd' }),
            annotations,
            pathType: 'Prefix' satisfies 'Exact' | 'ImplementationSpecific' | 'Prefix',
            ingressClassName: INGRESS_CLASSNAME_NGINX,
            tls: true,
        },
        // Ingress-controller already handles TLS. Argocd does too which causes collision. Disable argo from doing that
        // https://stackoverflow.com/questions/49856754/nginx-ingress-too-many-redirects-when-force-ssl-is-enabled
        extraArgs: ['--insecure'],
    },
    dex: {
        enabled: false,
    },
};

const {
    repo,
    charts: {
        argocd: { chart, version },
    },
} = helmChartsInfo.bitnami;

export const argocdHelm = new k8s.helm.v3.Chart(
    'argocd',
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: argocdValuesOld,
        namespace: namespaces.argocd,
        // By default Release resource will wait till all created resources
        // are available. Set this to true to skip waiting on resources being
        // available.
        skipAwait: false,
    },
    { provider: argocdProvider }
);
