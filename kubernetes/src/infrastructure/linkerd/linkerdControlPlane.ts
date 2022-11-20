import { ILinkerdControlPlaneLinkerd } from '../../../generatedHelmChartsTsTypes/linkerdControlPlaneLinkerd.ts';
import * as k8s from '@pulumi/kubernetes';
import { namespaces } from '../../types/ownTypes.ts';
import { DeepPartial } from '../../types/ownTypes.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';
import { linkerdProvider } from './settings.ts';

const LinkerdControlPlaneValues: DeepPartial<ILinkerdControlPlaneLinkerd> = {
    podAnnotations: {
        // 'sealedsecrets.bitnami.com/managed': 'true',
    },
    identity: {
        externalCA: true,
        issuer: {
            scheme: 'kubernetes.io/tls',
        },
    },
};

const {
    repo,
    charts: {
        linkerdControlPlane: { chart, version },
    },
} = helmChartsInfo.linkerd;

export const linkerdControlPlane = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: LinkerdControlPlaneValues,
        namespace: namespaces.linkerd,
        // By default Release resource will wait till all created resources
        // are available. Set this to true to skip waiting on resources being
        // available.
        skipAwait: false,
    },
    { provider: linkerdProvider }
);
