import { ServiceAccount } from "@pulumi/kubernetes/core/v1/index.js";
import { ClusterRole, ClusterRoleBinding } from "@pulumi/kubernetes/rbac/v1/index.js";
import { namespaces } from "../../types/ownTypes.js";


export const ciPipelineServiceAccount = new ServiceAccount("", {
    metadata: {
        name: 'operate-workflow-sa',
        namespace: namespaces.ciPipeline
        // namespace: argo-events
    }
})

export const ciPipelineClusterRole = new ClusterRole("", {
    apiVersion: 'rbac.authorization.k8s.io/v1',
    metadata: {
        name: 'operate-workflow-role',
        // namespace: namespaces.ciPipeline
    },
    rules: [{
        apiGroups: [
            "argoproj.io"
        ],
        verbs: ["*"],
        resources: [
            "workflows",
            "workflowtemplates",
            "cronworkflows",
            "clusterworkflowtemplates",
        ]
    }]
})

export const ciPipelineClusterRoleBinding = new ClusterRoleBinding("", {
    apiVersion: 'rbac.authorization.k8s.io/v1',
    metadata: {
        name: 'operate-workflow-cluster-role-binding',
        // namespace: namespaces.ciPipeline
    },
    roleRef: {
        apiGroup: "rbac.authorization.k8s.io",
        kind: ciPipelineClusterRole.kind,
        name: ciPipelineClusterRole.metadata.name
    },
    subjects: [{
        kind: ciPipelineServiceAccount.kind,
        name: ciPipelineServiceAccount.metadata.name,
        namespace: ciPipelineServiceAccount.metadata.namespace
    }]
})