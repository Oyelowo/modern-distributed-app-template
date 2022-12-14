import { Workflow } from "../../generatedCode/crds/argoproj/v1alpha1/workflow.js";
import { WorkflowTemplate } from "../../generatedCode/crds/argoproj/v1alpha1/workflowTemplate.js";
import { IoArgoprojWorkflowV1Alpha1 } from "../../generatedCode/crdsMissingSchemas/argo-workflows.js";
import { CPU, namespaces, Memory } from "../types/ownTypes.js";
import { ciWorkflowExecutorServiceAccount } from "./workflows/accessControl.js";

const kubernetesCiWorkflowTemplate = new WorkflowTemplate("", {
    metadata: {
        name: "kubernetes-ci",
        namespace: namespaces.ciPipeline,
        annotations: {
            "workflows.argoproj.io/description": `This workflows builds and tests Argo Workflows.

            It demonstrates:

            * Cache restore and store.
            * Publishing test reports.`,
        },
    },
    spec: {
        arguments: {
            parameters: [
                {
                    name: "branch",
                    value: "master",
                },
            ],
        },
        entrypoint: "main",
        onExit: "cache-store",
        volumeClaimTemplates: [
            {
                metadata: {
                    name: "work",
                },
                spec: {
                    accessModes: ["ReadWriteOnce"],
                    // storageClassName: '',
                    resources: {
                        requests: {
                            storage: "1Gi" satisfies Memory,
                            memory: "1Gi" satisfies Memory,
                            cpu: "100m" satisfies CPU,
                        },
                        limits: {
                            storage: "1Gi" satisfies Memory,
                            memory: "1Gi" satisfies Memory,
                            cpu: "100m" satisfies CPU,
                        },
                    },
                },
            },
        ],
        templates: [
            {
                name: "main",
                dag: {
                    failFast: true,
                    tasks: [
                        {
                            name: "setup-and-restore-npm-cache",
                            template: "setup-and-restore-npm-cache",
                        },
                        {
                            name: "check",
                            template: "check",
                            dependencies: ["setup-and-restore-npm-cache"],
                        },
                        {
                            name: "test",
                            template: "test",
                            dependencies: ["setup-and-restore-npm-cache"],
                        },
                        {
                            name: "generate-and-push-manifests",
                            template: "generate-and-push-manifests",
                            dependencies: ["check", "test"],
                        },
                    ],
                },
            },
            {
                name: "setup-and-restore-npm-cache",
                inputs: {
                    artifacts: [
                        {
                            name: "NPM_CACHE",
                            path: "/mnt/NPM_CACHE",
                            optional: true,
                            s3: {
                                key: "github.com/{{workflow.parameters.branch}}/kubernetes/NPM_CACHE.tgz",
                                // bucket: 'argo-workflows'
                            },
                        },
                        {
                            name: "code",
                            path: "/mnt/app/src",
                            git: {
                                // TODO: Get this value from the sensor trigger
                                repo: "https://github.com/Oyelowo/modern-distributed-app-template.git",
                                branch: "{{inputs.parameters.branch}}",
                                usernameSecret: {
                                    // TODO: reference this from the secret object variables
                                    name: "argo-workflows-s3-seaweedfs",
                                    key: "username",
                                },
                                passwordSecret: {
                                    name: "argo-workflows-s3-seaweedfs",
                                    key: "password",
                                },
                                // revision: '',
                                // depth: 1,
                                // sshPrivateKeySecret: {
                                //     key: '',
                                //     name: ''
                                // }
                            },
                        },
                    ],
                },
                container: {
                    volumeMounts: [
                        {
                            mountPath: "/app/src",
                            name: "work",
                            /* 
                             We use subpath here to share the "work" volume for the two mount paths. Otherwise
                             The second one will overwrite the first as they use the same volume(work)
                             Otherwise, we would have to create separate volumes for them if we dont want to use subPath
                             which would make things more verbose
                            */
                            subPath: "src",
                        },
                        {
                            // TODO: Switch all these to pnpm
                            //  "npm config get cache" should be at / root /.npm
                            mountPath: "/root/.npm",
                            name: "work",
                            subPath: "NPM_CACHE",
                        },
                    ],
                    image: "node:19.0.0",
                    workingDir: "/app/src/kubernetes",
                    command: ["sh", "-euxc"],
                    args: [
                        `
                      # # echo "INFO: Copy source code from git repo to current working directory"
                      cp -Rf /mnt/app/src/kubernetes/. .

                      NPM_CACHE_DIR=$(npm config get cache)
                      [ -e /mnt/NPM_CACHE ] && cp -Rf /mnt/NPM_CACHE/. $NPM_CACHE_DIR
                      npm ci --prefer-offline
                        `,
                    ],
                },
            },
            {
                name: "test",
                container: {
                    image: "node:19.0.0",
                    volumeMounts: [
                        {
                            mountPath: "/app/src",
                            name: "work",
                            subPath: "src",
                        },
                        {
                            // TODO: Switch all these to pnpm
                            //  "npm config get cache" should be at / root /.npm
                            mountPath: "/root/.npm",
                            name: "work",
                            subPath: "NPM_CACHE",
                        },
                    ],
                    workingDir: "/app/src/kubernetes",
                    command: ["sh", "-euxc"],
                    args: [
                        `
                      make test
                      echo "END: ls -lart modern-distributed-app-template"
                        `,
                    ],
                },
            },
            {
                name: "check",
                container: {
                    image: "node:19.0.0",
                    volumeMounts: [
                        {
                            mountPath: "/app/src",
                            name: "work",
                            subPath: "src",
                        },
                        {
                            mountPath: "/root/.npm",
                            name: "work",
                            subPath: "NPM_CACHE",
                        },
                    ],
                    workingDir: "/app/src/kubernetes",
                    command: ["sh", "-euxc"],
                    args: [
                        `
                      make check
                        `,
                    ],
                },
            },
            {
                name: "generate-and-push-manifests",
                container: {
                    image: "node:19.0.0",
                    volumeMounts: [
                        {
                            mountPath: "/app/src",
                            name: "work",
                            subPath: "src",
                        },
                        {
                            mountPath: "/root/.npm",
                            name: "work",
                            subPath: "NPM_CACHE",
                        },
                    ],
                    workingDir: "/app/src/kubernetes",
                    command: ["sh", "-euxc"],
                    args: [
                        `
                        make generate_manifests_ci environment=production
                        `,
                    ],
                },
            },
            {
                name: "cache-store",
                container: {
                    image: "node:19.0.0",
                    volumeMounts: [
                        {
                            mountPath: "/app/src",
                            name: "work",
                            subPath: "src",
                        },
                        {
                            mountPath: "/root/.npm",
                            name: "work",
                            subPath: "NPM_CACHE",
                        },
                    ],
                    workingDir: "/app/src/kubernetes",
                },
                outputs: {
                    artifacts: [
                        {
                            name: "NPM_CACHE",
                            optional: true,
                            s3: {
                                key: "github.com/{{workflow.parameters.branch}}/kubernetes/NPM_CACHE.tgz",
                            },
                        },
                    ],
                },
            },
        ],
    },
} satisfies IoArgoprojWorkflowV1Alpha1);

export const kubernetesCiWorkflow = new Workflow("kubernetes-ci-workflow", {
    metadata: {
        generateName: "kubernetes-ci-workflow",
        namespace: namespaces.ciPipeline,
    },
    spec: {
        serviceAccountName: ciWorkflowExecutorServiceAccount.metadata.name,
        synchronization: {
            mutex: {
                name: "workflow",
            },
        },
        artifactRepositoryRef: {
            configMap: "my-artifact-repository", // default is "artifact-repositories"
            key: "default-v1-s3-artifact-repository", //default can be set by the `workflows.argoproj.io/default-artifact-repository` annotation in config map.
        },
        workflowTemplateRef: {
            name: kubernetesCiWorkflowTemplate.metadata.name as any,
        },
    },
});
