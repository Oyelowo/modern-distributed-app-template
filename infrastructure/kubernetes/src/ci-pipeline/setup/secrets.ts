import { ConfigMap, Secret } from "@pulumi/kubernetes/core/v1/index.js";
import { namespaces } from "../../types/ownTypes.js";

export const argoWorkflowS3SecretsSeaweedFs = new Secret("", {
	metadata: {
		name: "argo-workflows-s3-seaweedfs",
		// TODO: Confirm if this should be in general argo-events namespace or the ci pipeline namespace
		namespace: namespaces.ciPipeline,
	},
	type: "kubernetes.io/basic-auth" satisfies "kubernetes.io/basic-auth",
	stringData: {
		// TODO: This should reference the secret object instead
		username: "Oyelowo",
		password: "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",
		accesskey: "h7EPYnL0Zz4hdYh2",
		secretkey: "Y3YcGSuxqK7ZEXi3AoROMx1gHel3kzd3",
	},
});

export const argoWorkflowGithubSecrets = new Secret("", {
	metadata: {
		name: "github-secrets",
		// TODO: Confirm if this should be in general argo-events namespace or the ci pipeline namespace
		namespace: namespaces.ciPipeline,
	},
	type: "kubernetes.io/basic-auth" satisfies "kubernetes.io/basic-auth",
	stringData: {
		// TODO: This should reference the secret object instead
		username: "Oyelowo",
		password: "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",
	},
});

// This is an alternative for doing configuration in argo workflows
// but I have not tried yet. Just keeping in case, and for reference
export const argoWorkflowArtifactRepositoryConfig = new ConfigMap("", {
	metadata: {
		name: "my-artifact-repository",
		// TODO: Confirm if this should be in general argo-events namespace or the ci pipeline namespace
		namespace: namespaces.ciPipeline,
		annotations: {
			// 'workflows.argoproj.io/default-artifact-repository': 'default-v1',
			"workflows.argoproj.io/default-artifact-repository":
				"default-v1-s3-artifact-repository",
		},
	},
	data: {
		//     # default-v1: {}
		"default-v1-s3-artifact-repository": `
            s3: {
                bucket: 'argo-workflows',
                endpoint: 'seaweedfs-s3.seaweedfs:8333',
                insecure: true,
                createBucketIfNotPresent: {
                    objectLocking: false
                },
                accessKeySecret: {
                    name: 'argo-workflows-s3-seaweedfs',
                    key: 'accesskey'

                },
                secretKeySecret: {
                    name: 'argo-workflows-s3-seaweedfs',
                    key: 'secretkey'
                }
            }
        }`,
	},
});
