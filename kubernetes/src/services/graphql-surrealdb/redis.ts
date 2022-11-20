import { IRedisBitnami } from '../../../generatedHelmChartsTsTypes/redisBitnami.ts';
import * as k8s from '@pulumi/kubernetes';
import { DeepPartial, namespaces } from '../../types/ownTypes.ts';
import { helmChartsInfo } from '../../shared/helmChartInfo.ts';
import { graphqlSurrealdb } from './index.ts';
import { getEnvVarsForKubeManifests } from '../../shared/environmentVariablesForManifests.ts';
import { graphqlSurrealdbSettings } from './settings.ts';

const { envVars } = graphqlSurrealdbSettings;
const env = getEnvVarsForKubeManifests();

export const redisValues: DeepPartial<IRedisBitnami> = {
    architecture: 'standalone',
    fullnameOverride: envVars.REDIS_SERVICE_NAME,
    replica: {
        replicaCount: 1,
    },
    global: {
        redis: {
            password: envVars.REDIS_PASSWORD,
        },
        storageClass: 'local-storage',
    },

    auth: {
        enabled: true,
        password: envVars.REDIS_PASSWORD,
    },
    master: {
        service: {
            type: 'ClusterIP',
            ports: {
                redis: Number(envVars.REDIS_PORT),
            },
        },
    },
};

// `http://${name}.${namespace}:${port}`;
const {
    repo,
    charts: {
        redis: { chart, version },
    },
} = helmChartsInfo.bitnami;

export const graphqlSurrealdbRedis = new k8s.helm.v3.Chart(
    chart,
    {
        chart,
        fetchOpts: {
            repo,
        },
        version,
        values: redisValues,
        namespace: namespaces.applications,
        // By default Release resource will wait till all created resources
        // are available. Set this to true to skip waiting on resources being
        // available.
        skipAwait: false,
    },
    { provider: graphqlSurrealdb.getProvider() }
);
