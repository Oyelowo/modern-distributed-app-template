import { IArgoRolloutsArgo } from '../../../generatedHelmChartsTsTypes/argoRolloutsArgo.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces } from '../../types/ownTypes.ts';
import { argoRolloutProvider } from './settings.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';

const argoRolloutValues: DeepPartial<IArgoRolloutsArgo> = {};

const {
    repo,
    charts: {
        argoRollout: { chart, version },
    },
} = helmChartsInfo.argo;

export const argoRolloutHelm = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: argoRolloutValues,
        namespace: namespaces.argoRollout,
        skipAwait: false,
    },
    { provider: argoRolloutProvider }
);
