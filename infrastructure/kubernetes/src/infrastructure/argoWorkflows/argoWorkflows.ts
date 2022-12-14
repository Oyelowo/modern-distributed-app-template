import { IArgoWorkflowsArgo } from "../../../generatedCode/helmChartsValuesTypeDefs/argoWorkflowsArgo.js";
import * as k8s from "@pulumi/kubernetes";
import { DeepPartial, namespaces } from "../../types/ownTypes.js";
import { argoWorkflowsProvider } from "./settings.js";
import { helmChartsInfo } from "../../shared/helmChartInfo.js";

const xx = new k8s.core.v1.Secret("", {
	metadata: {
		name: "argo-workflows-s3-seaweedfs",
		namespace: namespaces.argoWorkflows,
	},
	stringData: {
		// TODO: Move this into the .secret object and pass as env var
		username: "Oyelowo",
		password:
			"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",
		accessKey: "accessKey",
		secretKey: "secretKey",
	},
});

type S3Props = {
	// Note the `key` attribute is not the actual secret, it's the PATH to
	// the contents in the associated secret, as defined by the `name` attribute.
	accessKeySecret: {
		name: string;
		key: string;
	};
	secretKeySecret: {
		name: string;
		key: string;
	};
	// insecure will disable TLS. Primarily used for minio installs not configured with TLS
	insecure: boolean;
	bucket: string;
	endpoint: string;
	createBucketIfNotPresent?: {
		objectLocking: boolean;
	};
	region?: string;
	roleARN?: string;
	useSDKCreds?: boolean;
	encryptionOptions: {
		enableEncryption: boolean;
	};
};

const argoWorkflowsValues: DeepPartial<IArgoWorkflowsArgo> = {
	crds: {
		install: true,
	},
	server: {
		// enabled: true,
		// secure: true,
	},
	controller: {
		// Use this if and when you decide to persist argo workflows with postgres
		// persistence: {}
	},
	useDefaultArtifactRepo: true,
	artifactRepository: {
		// archiveLogs: true,
		s3: {
			/* 
			Note the `key` attribute is not the actual secret, it's the PATH to
			the contents in the associated secret, as defined by the `name` attribute.
			*/
			accessKeySecret: {
				// @ts-ignore
				name: "argo-workflows-s3-seaweedfs",
				key: "accesskey",
			},
			secretKeySecret: {
				// @ts-ignore
				name: "argo-workflows-s3-seaweedfs",
				key: "secretkey",
			},
			// insecure will disable TLS. Primarily used for seaweed installs not configured with TLS
			// TODO: Make secure
			insecure: true,
			endpoint: "seaweedfs-s3.seaweedfs:8333",
			bucket: "argo-workflows",
			encryptionOptions: {
				enableEncryption: true,
			},
		} as S3Props,
	},
};

const {
	repo,
	charts: { argoWorkflows: { chart, version } },
} = helmChartsInfo.argo;

export const argoWorkflowsHelm = new k8s.helm.v3.Chart(
	chart,
	{
		chart,
		fetchOpts: {
			repo,
		},
		version,
		values: argoWorkflowsValues,
		namespace: namespaces.argoWorkflows,
		skipAwait: false,
	},
	{ provider: argoWorkflowsProvider },
);
