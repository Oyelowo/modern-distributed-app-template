import { z } from "zod";

type Repo =
	| "oyelowo"
	| "nats"
	| "pingcap"
	| "bitnami"
	| "longhorn"
	| "jetstack"
	| "linkerd"
	| "argo"
	| "meilisearch"
	| "cilium"
	| "grafana"
	| "harbor"
	| "gitea"
	| "vmwareTanzu";

export const chartInfoSchema = z.object({
	chart: z.string(),
	version: z.string(),
	/** Sometimes, CRDS are not provided as part of the chart
	 */
	externalCrds: z.array(z.string()).optional(),
	/**
	 * // On rare occasions, a chart's CRD may not include a properly typed OpenAPI schema
	 *  In such cases, this property can be used to store the json schema itself, which can be obtained from elsewhere
	 * e.g: https://github.com/argoproj/argo-events/blob/master/manifests/base/crds/argoproj.io_eventbus.yaml
	 */
	missingCrdSchemas: z.array(z.string()).optional(),
	/**
	 * On rare occasions, rendering the CRD may be problematic, so this option allows skipping it.
	 */
	skipCrdRender: z.boolean().optional(),
});

type ChartInfo = z.infer<typeof chartInfoSchema>;
type ChartsInfo = Record<
	Repo,
	{
		repo: string;
		charts: Record<string, ChartInfo>;
	}
>;

export const helmChartsInfo = {
	oyelowo: {
		repo: "https://oyelowo.github.io",
		charts: {
			seaweedfs: {
				chart: "seaweedfs",
				version: "3.30",
			},
		},
	},
	nats: {
		repo: "https://nats-io.github.io/k8s/helm/charts",
		charts: {
			nats: {
				chart: "nats",
				version: "0.18.1",
			},
			// natsJetstream:
			nack: {
				chart: "nack",
				version: "0.17.4",
				externalCrds: [
					"https://raw.githubusercontent.com/nats-io/nack/v0.6.0/deploy/crds.yml",
				],
			},
			natsOperator: {
				chart: "nats-operator",
				version: "0.7.4",
			},
			natsAccountServer: {
				chart: "nats-account-server",
				version: "0.8.0",
			},
			natsKafka: {
				chart: "nats-kafka",
				version: "0.13.1",
			},
			surveyor: {
				chart: "surveyor",
				version: "0.14.1",
			},
		},
	},
	pingcap: {
		repo: "https://charts.pingcap.org/",
		charts: {
			tikvOperator: {
				chart: "tidb-operator",
				version: "v1.3.8",
				externalCrds: [
					"https://raw.githubusercontent.com/pingcap/tidb-operator/v1.3.8/manifests/crd.yaml",
				],
			},
			tikvCluster: {
				chart: "tidb-cluster",
				version: "v1.3.8",
			},
		},
	},
	longhorn: {
		repo: "https://charts.longhorn.io",
		charts: {
			longhorn: {
				chart: "longhorn",
				version: "v1.3.2",
			},
		},
	},
	bitnami: {
		repo: "https://charts.bitnami.com/bitnami",
		charts: {
			sealedSecrets: {
				chart: "sealed-secrets",
				version: "1.1.6",
			},
			certManager: {
				chart: "cert-manager",
				version: "0.8.4",
			},
			nginxIngress: {
				chart: "nginx-ingress-controller",
				version: "9.3.18",
			},
			argocd: {
				chart: "argo-cd",
				version: "4.2.3",
			},
			metalb: {
				chart: "metallb",
				version: "4.1.5",
			},
			redis: {
				chart: "redis",
				version: "17.3.2",
			},
			prometheus: {
				chart: "kube-prometheus",
				version: "8.1.11",
			},
			thanos: {
				chart: "thanos",
				version: "11.5.5",
			},
			harbor: {
				chart: "harbor",
				version: "15.2.5",
			},
		},
	},
	jetstack: {
		repo: "https://charts.jetstack.io",
		charts: {
			certManager: {
				chart: "cert-manager",
				version: "v1.9.1",
			},
			certManagerTrust: {
				chart: "cert-manager-trust",
				version: "v0.2.0",
			},
		},
	},
	linkerd: {
		repo: "https://helm.linkerd.io/stable",
		charts: {
			linkerdCrds: {
				chart: "linkerd-crds",
				version: "1.4.0",
			},
			linkerdControlPlane: {
				chart: "linkerd-control-plane",
				version: "1.9.5",
				// Skip rendering crd here as that has been done with linkerd-crds
				skipCrdRender: true,
			},
			linkerdViz: {
				chart: "linkerd-viz",
				version: "30.3.5",
			},
		},
	},
	meilisearch: {
		repo: "https://meilisearch.github.io/meilisearch-kubernetes",
		charts: {
			meilisearch: {
				chart: "meilisearch",
				version: "0.1.41",
			},
		},
	},
	argo: {
		repo: "https://argoproj.github.io/argo-helm",
		charts: {
			argoCD: {
				chart: "argo-cd",
				version: "5.6.0",
			},
			argoWorkflows: {
				chart: "argo-workflows",
				version: "0.20.1",
				externalCrds: [
					"https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/base/crds/full/argoproj.io_workflows.yaml",
					"https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/base/crds/full/argoproj.io_clusterworkflowtemplates.yaml",
					"https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/base/crds/full/argoproj.io_cronworkflows.yaml",
					"https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/base/crds/full/argoproj.io_workflowartifactgctasks.yaml",
					"https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/base/crds/full/argoproj.io_workfloweventbindings.yaml",
					"https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/base/crds/full/argoproj.io_workflowtaskresults.yaml",
					"https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/base/crds/full/argoproj.io_workflowtasksets.yaml",
					"https://raw.githubusercontent.com/argoproj/argo-workflows/master/manifests/base/crds/full/argoproj.io_workflowtemplates.yaml",
				],
			},
			argoEvent: {
				chart: "argo-events",
				version: "2.0.6",
				missingCrdSchemas: [
					"https://raw.githubusercontent.com/argoproj/argo-events/master/api/jsonschema/schema.json",
				],
			},
			argoRollout: {
				chart: "argo-rollouts",
				version: "2.21.1",
			},
			argoImageUpdater: {
				chart: "argocd-image-updater",
				version: "0.8.1",
			},
		},
	},
	cilium: {
		repo: "https://helm.cilium.io/",
		charts: {
			cilium: {
				chart: "cilium",
				version: "1.12.3",
			},
		},
	},
	grafana: {
		repo: "https://grafana.github.io/helm-charts",
		charts: {
			grafana: {
				chart: "grafana",
				version: "6.42.2",
			},
			loki: {
				chart: "loki-distributed",
				version: "0.63.1",
			},
			tempo: {
				chart: "tempo-distributed",
				version: "0.26.7",
			},
			promtail: {
				chart: "promtail",
				version: "6.5.1",
			},
		},
	},
	harbor: {
		repo: "https://helm.goharbor.io",
		charts: {
			harbor: {
				chart: "harbor",
				version: "1.10.1",
			},
		},
	},
	gitea: {
		repo: "https://dl.gitea.io/charts/",
		charts: {
			gitea: {
				chart: "gitea",
				version: "6.0.2",
			},
		},
	},
	vmwareTanzu: {
		repo: "https://vmware-tanzu.github.io/helm-charts/",
		charts: {
			velero: {
				chart: "velero",
				version: "2.32.1",
			},
		},
	},
} satisfies ChartsInfo;
