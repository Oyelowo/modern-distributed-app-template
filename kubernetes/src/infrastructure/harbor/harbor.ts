import { IHarborHarbor } from '../../../generatedHelmChartsTsTypes/harborHarbor.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces } from '../../types/ownTypes.ts';
import { harborProvider } from './settings.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';

const harborValues: DeepPartial<IHarborHarbor> = {};

const {
    repo,
    charts: {
        harbor: { chart, version },
    },
} = helmChartsInfo.harbor;

export const harborHelm = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: harborValues,
        namespace: namespaces.harbor,
        skipAwait: false,
    },
    { provider: harborProvider }
);
