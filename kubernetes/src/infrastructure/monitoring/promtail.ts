import { IPromtailGrafana } from '../../../generatedHelmChartsTsTypes/promtailGrafana.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces } from '../../types/ownTypes.ts';
import { monitoringProvider } from './settings.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';

const promtailValues: DeepPartial<IPromtailGrafana> = {};

const {
    repo,
    charts: {
        promtail: { chart, version },
    },
} = helmChartsInfo.grafana;

export const promtailHelm = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: promtailValues,
        namespace: namespaces.monitoring,
        skipAwait: false,
    },
    { provider: monitoringProvider }
);
