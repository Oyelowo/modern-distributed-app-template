import { IArgoWorkflowsArgo } from '../../../generatedHelmChartsTsTypes/argoWorkflowsArgo.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces } from '../../types/ownTypes.ts';
import { argoWorkflowsProvider } from './settings.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';

const argoWorkflowsValues: DeepPartial<IArgoWorkflowsArgo> = {
    crds: {
        install: true,
    },
};

const {
    repo,
    charts: {
        argoWorkflows: { chart, version },
    },
} = helmChartsInfo.argo;

export const argoWorkflowsHelm = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: argoWorkflowsValues,
        namespace: namespaces.argoWorkflows,
        skipAwait: false,
    },
    { provider: argoWorkflowsProvider }
);
