import { Workflow } from "../../generatedCode/crds/argoproj/v1alpha1/workflow.js";
import { WorkflowTemplate } from "../../generatedCode/crds/argoproj/v1alpha1/workflowTemplate.js";
import { IoArgoprojWorkflowV1Alpha1 } from "../../generatedCode/crdsMissingSchemas/argo-workflows.js";
import { CPU, namespaces, Memory } from "../types/ownTypes.js";
import { ciWorkflowExecutorServiceAccount } from "./workflows/accessControl.js";

const typescriptCiWorkflowTemplate = new WorkflowTemplate("", {
	metadata: {
		name: "typescript-ci",
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
							name: "build-image-base",
							template: "build-image-base",
							dependencies: ["setup-and-restore-npm-cache", "check", "test"],
						},
						{
							name: "build-image-docs",
							template: "build-image-docs",
							dependencies: ["build-image-base"],
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
								key: "github.com/{{workflow.parameters.branch}}/typescript/NPM_CACHE.tgz",
								// bucket: 'argo-workflows'
							},
						},
						{
							name: "TURBO_CACHE",
							path: "/mnt/TURBO_CACHE",
							optional: true,
							s3: {
								key: "github.com/{{workflow.parameters.branch}}/typescript/TURBO_CACHE.tgz",
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
					workingDir: "/app/src/typescript",
					command: ["sh", "-euxc"],
					args: [
						`
                      # # echo "INFO: Copy source code from git repo to current working directory"
                      cp -Rf /mnt/app/src/typescript/. .

                      NPM_CACHE_DIR=$(npm config get cache)
                      [ -e /mnt/NPM_CACHE ] && cp -Rf /mnt/NPM_CACHE/. $NPM_CACHE_DIR
                      npm ci --prefer-offline

                      [ -e /mnt/TURBO_CACHE ] && cp -Rf /mnt/TURBO_CACHE/. ./node_modules/.cache
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
					workingDir: "/app/src/typescript",
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
					workingDir: "/app/src/typescript",
					command: ["sh", "-euxc"],
					args: [
						`
                      make check
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
					workingDir: "/app/src/typescript",
				},
				outputs: {
					artifacts: [
						{
							name: "NPM_CACHE",
							optional: true,
							s3: {
								key: "github.com/{{workflow.parameters.branch}}/typescript/NPM_CACHE.tgz",
							},
						},
						{
							name: "TURBO_CACHE",
							path: "/app/src/typescript/node_modules/.cache",
							optional: true,
							s3: {
								key: "github.com/{{workflow.parameters.branch}}/typescript/TURBO_CACHE.tgz",
							},
						},
					],
				},
			},
			{
				name: "build-image-base",
				/* 
                Mount the configuration so we can push the image.
                This should create the /.docker/config.json file.
                 */
				volumes: [
					{
						name: "docker-config",
						secret: {
							secretName: "docker-config",
						},
					},
				],
				container: {
					image: "moby/buildkit:master",
					// image: 'moby/buildkit:v0.10.5-rootless'
					volumeMounts: [
						{
							name: "docker-config",
							mountPath: "/.docker",
							subPath: "src",
						},
						{
							name: "work",
							mountPath: "/app/src",
							subPath: "src",
						},
						{
							//   base layer cache is stored here for buildkit.For docker, equivalent is /var/lib/docker
							name: "work",
							mountPath: "/var/lib/buildkit",
							subPath: "IMAGE_CACHE_BASE",
						},
					],
					workingDir: "/app/src/typescript",
					securityContext: {
						privileged: true,
					},
					env: [
						{
							name: "DOCKER_CONFIG",
							value: "/.docker",
						},
					],
					command: ["buildctl-daemonless.sh"],
					args: [
						"build",
						"--frontend",
						"dockerfile.v0",
						"--local",
						"context=.",
						"--local",
						"dockerfile=.",
						"--opt",
						"target=builder-base",
						"--opt",
						"filename=Dockerfile.production",
						"--opt",
						"build-arg:NEXT_PUBLIC_API_URL=oyelowo.ca",
						"--output",
						"type=image,name=ghcr.io/oyelowo/typescript-base:master-latest,push=true",
						"--export-cache",
						"type=registry,ref=ghcr.io/oyelowo/typescript-base:master-latest, mode=min",
						//  'type=inline:master-latest',
						"--import-cache",
						"type=registry,ref=ghcr.io/oyelowo/typescript-base:master-latest",
					],
				},
			},
			{
				name: "build-image-docs",
				/* 
                Mount the configuration so we can push the image.
                This should create the /.docker/config.json file.
                 */
				volumes: [
					{
						name: "docker-config",
						secret: {
							secretName: "docker-config",
						},
					},
				],
				container: {
					image: "moby/buildkit:master",
					// image: 'moby/buildkit:v0.10.5-rootless'
					volumeMounts: [
						{
							name: "docker-config",
							mountPath: "/.docker",
							// subPath: 'src'
						},
						{
							name: "work",
							mountPath: "/app/src",
							subPath: "src",
						},
						{
							//   base layer cache is stored here for buildkit.For docker, equivalent is /var/lib/docker
							name: "work",
							mountPath: "/var/lib/buildkit",
							subPath: "IMAGE_CACHE_BASE",
						},
					],
					workingDir: "/app/src/typescript",
					securityContext: {
						privileged: true,
					},
					env: [
						{
							name: "DOCKER_CONFIG",
							value: "/.docker",
						},
					],
					command: ["buildctl-daemonless.sh"],
					args: [
						"build",
						"--frontend",
						"dockerfile.v0",
						"--local",
						"context=.",
						"--local",
						"dockerfile=.",
						"--opt",
						"target=docs",
						"--opt",
						"filename=Dockerfile.production",
						"--opt",
						"build-arg:NEXT_PUBLIC_API_URL=oyelowo.ca",
						"--output",
						"type=image,name=ghcr.io/oyelowo/docs:v1,push=true",
						"--export-cache",
						"type=registry,ref=ghcr.io/oyelowo/docs:master-latest, mode=max",
						"--import-cache",
						"type=registry,ref=ghcr.io/oyelowo/typescript-base:master-latest",
						"--import-cache",
						"type=registry,ref=ghcr.io/oyelowo/docs:master-latest",
					],
				},
			},
		],
	},
} satisfies IoArgoprojWorkflowV1Alpha1);

export const typescriptCiWorkflow = new Workflow("typescript-ci-workflow", {
	metadata: {
		generateName: "typescript-ci-workflow",
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
			name: typescriptCiWorkflowTemplate.metadata.name as any,
		},
	},
});
