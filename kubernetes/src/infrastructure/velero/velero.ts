import { IVeleroVmwareTanzu } from '../../../generatedHelmChartsTsTypes/veleroVmwareTanzu.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces } from '../../types/ownTypes.ts';
import { veleroProvider } from './settings.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';

const veleroValues: DeepPartial<IVeleroVmwareTanzu> = {
    backupsEnabled: true,
    configuration: {
        backupStorageLocation: {},
    },
};

const {
    repo,
    charts: {
        velero: { chart, version },
    },
} = helmChartsInfo.vmwareTanzu;

export const veleroHelm = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: veleroValues,
        namespace: namespaces.velero,
        skipAwait: false,
    },
    { provider: veleroProvider }
);
