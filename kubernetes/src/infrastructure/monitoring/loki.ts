import { ILokiDistributedGrafana } from '../../../generatedHelmChartsTsTypes/lokiDistributedGrafana.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces } from '../../types/ownTypes.ts';
import { monitoringProvider } from './settings.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';

const lokiValues: DeepPartial<ILokiDistributedGrafana> = {};

const {
    repo,
    charts: {
        loki: { chart, version },
    },
} = helmChartsInfo.grafana;

export const lokiHelm = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: lokiValues,
        namespace: namespaces.monitoring,
        skipAwait: false,
    },
    { provider: monitoringProvider }
);
