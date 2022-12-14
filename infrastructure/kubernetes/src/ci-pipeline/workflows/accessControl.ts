import { ServiceAccount } from "@pulumi/kubernetes/core/v1/index.js";
import {
	ClusterRole,
	ClusterRoleBinding,
	Role,
	RoleBinding,
} from "@pulumi/kubernetes/rbac/v1/index.js";
import { namespaces } from "../../types/ownTypes.js";

// Access controls for argo infrastructure
export const ciWorkflowExecutorServiceAccount = new ServiceAccount("", {
	metadata: {
		name: "operate-workflow-sa",
		namespace: namespaces.ciPipeline,
		// namespace: argo-events
	},
});

export const ciWorkflowExecutorRole = new Role("", {
	apiVersion: "rbac.authorization.k8s.io/v1",
	metadata: {
		name: "executor",
		namespace: namespaces.ciPipeline,
	},
	rules: [
		{
			apiGroups: ["argoproj.io"],
			verbs: [
				// "*",
				"create",
				"patch",
			],
			resources: [
				"workflowtaskresults",
				// "workflows",
				// "workflowtemplates",
				// "cronworkflows",
				// "clusterworkflowtemplates",
			],
		},
	],
});

export const ciWorkflowExecutorRoleBinding = new RoleBinding("", {
	apiVersion: "rbac.authorization.k8s.io/v1",
	metadata: {
		name: "sa-typescript-ci-workflow:executor",
		namespace: namespaces.ciPipeline,
	},
	subjects: [
		{
			kind: ciWorkflowExecutorServiceAccount.kind,
			name: ciWorkflowExecutorServiceAccount.metadata.name,
			namespace: ciWorkflowExecutorServiceAccount.metadata.namespace,
		},
	],
	roleRef: {
		kind: ciWorkflowExecutorRole.kind,
		name: ciWorkflowExecutorRole.metadata.name,
		apiGroup: "rbac.authorization.k8s.io",
	},
});
