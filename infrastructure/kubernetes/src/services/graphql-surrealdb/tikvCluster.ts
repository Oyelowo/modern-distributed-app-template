import pc from "../../../generatedCode/crds/index.js";
import { graphqlSurrealdb } from "./app.js";
import { graphqlSurrealdbSettings } from "./settings.js";

// TiKV acts as the persistent layer for surrealdb. Surrealdb also supports in-memory, file-based,
// foundationdb, rocksdb etc
export const surrealDBTikvCluster = new pc.pingcap.v1alpha1.TidbCluster(
	"surrealdb-tikv-cluster",
	{
		metadata: {
			name: graphqlSurrealdbSettings.envVars.TIKV_NAME,
			namespace: graphqlSurrealdbSettings.metadata.namespace,
			// clusterName: "",
		},
		spec: {
			timezone: "UTC",
			configUpdateStrategy: "RollingUpdate",
			pvReclaimPolicy: "Retain",
			enableDynamicConfiguration: true,
			statefulSetUpdateStrategy: "RollingUpdate",
			pd: {
				baseImage: "pingcap/pd",
				service: {
					port: Number(graphqlSurrealdbSettings.envVars.TIKV_PORT),
				},
				maxFailoverCount: 0,
				replicas: 3,
				requests: {
					storage: "10Gi",
				},
				storageClassName: "local-storage",
				config: `
                [dashboard]
                    internal-proxy = true
              ` as any,
			},
			tikv: {
				baseImage: "pingcap/tikv",
				maxFailoverCount: 0,
				storageClassName: "local-storage",
				replicas: 3,
				requests: {
					storage: "100Gi",
				},
				config: {},
			},
		},
	},
	{ provider: graphqlSurrealdb.getProvider() },
);

/* const tidbClusterAutoScaler = new pc.pingcap.v1alpha1.TidbClusterAutoScaler('er', {
	apiVersion: 'pingcap.com/v1alpha1',
	kind: "TidbClusterAutoScaler",
	metadata: {
		name: "",
		namespace: "",
		clusterName: "",
		deletionGracePeriodSeconds: 120,
	},
	spec: {
		cluster: {
			clusterDomain: "",
			name: "",
			namespace: ""
		},
		tikv: {
			external: {
				maxReplicas: 5,
				endpoint: {
					host: "",
					path: "",
					port: 2000
				},

			},
			scaleOutIntervalSeconds: 4,
			scaleInIntervalSeconds: 5,
		},
		// tidb: {}

	},

});
 */
