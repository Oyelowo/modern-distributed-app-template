import { Workflow } from "../../generatedCode/crds/argoproj/v1alpha1/workflow.js";
import { WorkflowTemplate } from "../../generatedCode/crds/argoproj/v1alpha1/workflowTemplate.js";
import { IoArgoprojWorkflowV1Alpha1 } from "../../generatedCode/crdsMissingSchemas/argo-workflows.js";
import { CPU, namespaces, Memory } from "../types/ownTypes.js";
import { ciWorkflowExecutorServiceAccount } from "./workflows/accessControl.js";

const rustCiWorkflowTemplate = new WorkflowTemplate("", {
	metadata: {
		name: "rust-ci",
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
							storage: "3Gi" satisfies Memory,
							memory: "2Gi" satisfies Memory,
							cpu: "100m" satisfies CPU,
						},
						limits: {
							storage: "4Gi" satisfies Memory,
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
							name: "setup-and-restore-cargo-cache",
							template: "setup-and-restore-cargo-cache",
						},
						{
							name: "check",
							template: "check",
							dependencies: ["setup-and-restore-cargo-cache"],
						},
						{
							name: "test",
							template: "test",
							dependencies: ["setup-and-restore-cargo-cache"],
						},
						{
							name: "build-image-base",
							template: "build-image-base",
							dependencies: ["setup-and-restore-cargo-cache", "check", "test"],
						},
						{
							name: "build-image-graphql-surrealdb",
							template: "build-image-graphql-surrealdb",
							dependencies: ["build-image-base"],
						},
					],
				},
			},
			{
				name: "setup-and-restore-cargo-cache",
				inputs: {
					artifacts: [
						{
							name: "CARGO_CACHE",
							path: "/mnt/cargo_CACHE",
							optional: true,
							s3: {
								key: "github.com/{{workflow.parameters.branch}}/rust/CARGO_CACHE.tgz",
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
							// TODO: Switch all these to pcargo
							//  "cargo config get cache" should be at / root /.cargo
							mountPath: "/root/.cargo",
							name: "work",
							subPath: "cargo_CACHE",
						},
					],
					image: "rust:1.65.0",
					workingDir: "/app/src/rust",
					command: ["sh", "-euxc"],
					args: [
						`
                       # # echo "INFO: Copy source code from git repo to current working directory"
                      cp -Rf /mnt/app/src/rust/. .

                      CARGO_CACHE_DIR=$HOME/.cargo
                      echo "START $CARGO_CACHE_DIR"
                      ls $CARGO_CACHE_DIR
                      echo "END $CARGO_CACHE_DIR"
                      rustup component add rustfmt
                      rustup component add clippy
                      # cargo test
                      [ -e /mnt/CARGO_CACHE ] && cp -Rf /mnt/CARGO_CACHE/. $CARGO_CACHE_DIR
                      # [ -e /mnt/CARGO_CACHE ] && cp -Rf /mnt/CARGO_CACHE/.cargo/. $CARGO_CACHE_DIR

                      # rustup component add rustfmt
                      # rustup component add clippy
                      # apt-get install libclang-dev

                      ls -lart /root
                      ls -lart /root/.cargo
                        `,
					],
				},
			},
			{
				name: "test",
				container: {
					image: "rust:1.65.0",
					volumeMounts: [
						{
							mountPath: "/app/src",
							name: "work",
							subPath: "src",
						},
						{
							mountPath: "/root/.cargo",
							name: "work",
							subPath: "CARGO_CACHE",
						},
					],
					workingDir: "/app/src/rust",
					command: ["sh", "-euxc"],
					args: [
						`
                      # curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
                      # apt-get install libc6=2.31-0ubuntu9.2 libc6:i386=2.31-0ubuntu9.2
                      apt-get update ; apt-get install -y clang cmake ; apt-get install -y protobuf-compiler; rustup component add rustfmt

                      rustup component add rustfmt
                      rustup component add clippy
                      make test
                      echo "END: ls -lart modern-distributed-app-template"
                        `,
					],
				},
			},
			{
				name: "check",
				container: {
					image: "rust:1.65.0",
					volumeMounts: [
						{
							mountPath: "/app/src",
							name: "work",
							subPath: "src",
						},
						{
							mountPath: "/root/.cargo",
							name: "work",
							subPath: "CARGO_CACHE",
						},
					],
					workingDir: "/app/src/rust",
					command: ["sh", "-euxc"],
					args: [
						`
                      # apt-get install libc6=2.31-0ubuntu9.2 libc6:i386=2.31-0ubuntu9.2
                      apt-get update ; apt-get install -y clang cmake ; apt-get install -y protobuf-compiler; rustup component add rustfmt
                      rustup component add clippy
                      make check
                        `,
					],
				},
			},
			{
				name: "cache-store",
				container: {
					image: "rust:1.65.0",
					volumeMounts: [
						{
							mountPath: "/app/src",
							name: "work",
							subPath: "src",
						},
						{
							mountPath: "/root/.cargo",
							name: "work",
							subPath: "CARGO_CACHE",
						},
					],
					workingDir: "/app/src/rust",
					command: ["sh", "-euxc"],
					args: [
						`
                      # Copy relevant cache: https://doc.rust-lang.org/cargo/guide/cargo-home.html#caching-the-cargo-home-in-ci
                      cp -Rf /root/.cargo/bin /app/cargo-cache
                      cp -Rf /root/.cargo/registry/index /app/cargo-cache
                      cp -Rf /root/.cargo/registry/cache /app/cargo-cache
                      cp -Rf /root/.cargo/git/db /app/cargo-cache
                        `,
					],
				},
				outputs: {
					artifacts: [
						{
							name: "CARGO_CACHE",
							path: "/app/cargo-cache/.cargo",
							optional: true,
							s3: {
								key: "github.com/{{workflow.parameters.branch}}/rust/CARGO_CACHE.tgz",
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
					workingDir: "/app/src/rust",
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
						"filename=Dockerfile.development",
						"filename=Dockerfile.production",
						"--output",
						//   # replace :master with interpolated branch name
						"type=image,name=ghcr.io/oyelowo/rust-base:master-latest,push=true",
						"--export-cache",
						"type=registry,ref=ghcr.io/oyelowo/rust-base:master-latest, mode=min",
						//   # - type=inline:master-latest
						"--import-cache",
						"type=registry,ref=ghcr.io/oyelowo/rust-base:master-latest",
					],
				},
			},
			{
				name: "build-image-graphql-surrealdb",
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
					workingDir: "/app/src/rust",
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
						"target=graphql-surrealdb",
						"--opt",
						"filename=Dockerfile.development",
						//   'filename=Dockerfile.production',
						"--opt",
						"build-arg:NEXT_PUBLIC_API_URL=oyelowo.ca",
						"--output",
						"type=image,name=ghcr.io/oyelowo/graphql-surrealdb:v1,push=true",
						"--export-cache",
						"type=registry,ref=ghcr.io/oyelowo/graphql-surrealdb:master-latest, mode=max",
						"--import-cache",
						"type=registry,ref=ghcr.io/oyelowo/graphql-surrealdb:master-latest",
						"--import-cache",
						"type=registry,ref=ghcr.io/oyelowo/rust-base:master-latest",
					],
				},
			},
		],
	},
} satisfies IoArgoprojWorkflowV1Alpha1);

export const rustCiWorkflow = new Workflow("rust-ci-workflow", {
	metadata: {
		generateName: "rust-ci-workflow",
		namespace: namespaces.ciPipeline,
	},
	spec: {
		serviceAccountName: ciWorkflowExecutorServiceAccount.metadata.name,
		// synchronization: {
		//     mutex: {
		//         name: "workflow",
		//     },
		// },
		// artifactRepositoryRef: {
		//     configMap: "my-artifact-repository", // default is "artifact-repositories"
		//     key: "default-v1-s3-artifact-repository", //default can be set by the `workflows.argoproj.io/default-artifact-repository` annotation in config map.
		// },
		workflowTemplateRef: {
			name: rustCiWorkflowTemplate.metadata.name as any,
		},
	},
});
