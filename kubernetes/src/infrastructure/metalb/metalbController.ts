import { IMetallbBitnami } from '../../../generatedHelmChartsTsTypes/metallbBitnami.ts';
import * as k8s from '@pulumi/kubernetes';
import { namespaces } from '../../types/ownTypes.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';
import { DeepPartial } from '../../types/ownTypes.ts';
import { metalbProvider } from './settings.ts';

const metalbOperatValues: DeepPartial<IMetallbBitnami> = {};

// `http://${name}.${namespace}:${port}`;
const {
    repo,
    charts: {
        metalb: { chart, version },
    },
} = helmChartsInfo.bitnami;

export const metalbController = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: metalbOperatValues,
        namespace: namespaces.metalb,
        // By default Release resource will wait till all created resources
        // are available. Set this to true to skip waiting on resources being
        // available.
        skipAwait: false,
    },
    { provider: metalbProvider }
);
