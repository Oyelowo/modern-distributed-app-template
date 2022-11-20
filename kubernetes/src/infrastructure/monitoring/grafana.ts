import { IGrafanaGrafana } from '../../../generatedHelmChartsTsTypes/grafanaGrafana.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces } from '../../types/ownTypes.ts';
import { monitoringProvider } from './settings.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';

const grafanaValues: DeepPartial<IGrafanaGrafana> = {};

const {
    repo,
    charts: {
        grafana: { chart, version },
    },
} = helmChartsInfo.grafana;

export const grafanaHelm = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: grafanaValues,
        namespace: namespaces.monitoring,
        skipAwait: false,
    },
    { provider: monitoringProvider }
);
