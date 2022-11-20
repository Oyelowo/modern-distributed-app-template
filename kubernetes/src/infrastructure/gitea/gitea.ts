import { IGiteaGitea } from '../../../generatedHelmChartsTsTypes/giteaGitea.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces } from '../../types/ownTypes.ts';
import { argoEventProvider } from './settings.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';

const argoEventValues: DeepPartial<IGiteaGitea> = {};

const {
    repo,
    charts: {
        gitea: { chart, version },
    },
} = helmChartsInfo.gitea;

export const argoEventHelm = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: argoEventValues,
        namespace: namespaces.argoEvent,
        skipAwait: false,
    },
    { provider: argoEventProvider }
);
