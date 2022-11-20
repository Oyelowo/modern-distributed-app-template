import { IThanosBitnami } from '../../../generatedHelmChartsTsTypes/thanosBitnami.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces } from '../../types/ownTypes.ts';
import { monitoringProvider } from './settings.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';

const thanosValues: DeepPartial<IThanosBitnami> = {};

const {
    repo,
    charts: {
        thanos: { chart, version },
    },
} = helmChartsInfo.bitnami;

export const thanosHelm = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: thanosValues,
        namespace: namespaces.monitoring,
        skipAwait: false,
    },
    { provider: monitoringProvider }
);
