import { EventSource } from "../../../generatedCrdsTs/argoproj/v1alpha1/eventSource.js";
import { Workflow } from "../../../generatedCrdsTs/argoproj/v1alpha1/workflow.js";
import { Memory } from "../../types/ownTypes.js";
import type { IoArgoprojWorkflowV1Alpha1Workflow, MySchema } from "./type.js";
import type { IoArgoprojEventbusV1Alpha1EventBus, IoArgoprojSensorV1Alpha1Sensor, MySchema as ArgoEventSchema } from "../argoEvent/type.js";
import { EventBus } from "../../../generatedCrdsTs/argoproj/v1alpha1/eventBus.js";
import { Sensor } from "../../../generatedCrdsTs/argoproj/v1alpha1/sensor.js";
// import { FromSchema } from "json-schema-to-ts";
import { Get } from 'type-fest'
import { AutoPath } from 'ts-toolbelt/out/Function/_api.js'
import { Split } from 'ts-toolbelt/out/String/_api.js'
import { Path } from 'ts-toolbelt/out/Object/Path.js'
// F.AutoPath<>
// import { AutoPath } from 'ts-toolbelt/out/Function/AutoPath.js'


declare function get<O extends object, P extends string>(
    object: O, path: AutoPath<O, P>
): Path<O, Split<P, '.'>>
declare function get2<O extends object, P extends string, X extends AutoPath<O, P>, K extends string>(
    object: O, path: AutoPath<O, P>, x: X // This is a placeholder to serve as an extra information to show the dev name of the index they're accessing
): AutoPath<O, P>

declare const user: User

type User = {
    name: string
    friends: User[]
}


const kk = {
    "spec": {
        "serviceAccountName": "sa-typescript-ci-workflow",
        "workflowTemplateRef": {
            "name": "typescript-ci"
        },
        "entrypoint": "whalesay",
        "arguments": {
            "parameters": [
                {
                    "name": "pr-title",
                    "value": "",
                },
                {
                    "name": "pr-number"
                    , "value": ""
                },
                {
                    "name": "short-sha"
                    , "value": ""
                }
            ]
        }
    }
} as const

// const p : Get<typeof kk, "re"> = "trr"
const kl = kk['spec']['arguments']['parameters'][0]['name'] === "pr-title"
// works
// const rt = "" satisfies AutoPath<typeof kk, "spec.arguments.parameters.0.value">

const friendNamez = get2(kk, 'spec.arguments.parameters.0.value', "pr-title")
const friendNamex = get2(kk, 'spec.arguments.parameters.1.value', "pr-number")
const friendNamec = get2(kk, 'spec.arguments.parameters.2.value', "short-sha")
const friendName = get(kk, "spec.arguments.parameters.2")
const friendFriendName = get(user, 'friends.40.friends.12.name')

// errors
const friendNames = get(user, 'friends.40.names')
const friendFriendNames = get(user, 'friends.40.friends.12.names')


const event = new EventSource('', {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'EventSource',
    metadata: {},
    spec: {
        github: {
            modernApp: {
                // contentType: '',
                filter: {
                    expression: 'body.ref === master',

                },
                repositories: [{
                    names: ['modern-distributed-app-template'],
                    owner: 'oyelowo'
                }],
                webhook: {
                    endpoint: '/push',
                    port: '12000',
                    method: 'POST',
                    url: 'http://139-144-160-239.ip.linodeusercontent.com'
                },
                events: ['*'],
                apiToken: {
                    key: '',
                    name: '',
                    // optional: false,
                }
            }
        },
        // file:{
        //     pp :{
        //         eventType: '',
        //         watchPathConfig:{},

        //     }
        // }
    }
} satisfies ArgoEventSchema)

const eventBus = new EventBus('', {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'EventBus',
    metadata: {},
    spec: {
        jetstream: {},
        nats: {}
    }
} satisfies IoArgoprojEventbusV1Alpha1EventBus)

const eventSensor = new Sensor('', {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Sensor',
    metadata: {},
    spec: {
        template: {
            serviceAccountName: '',
        },
        eventBusName: '',
        replicas: 1,
        dependencies: [{
            eventName: '', eventSourceName: '', name: '',
            filtersLogicalOperator: 'or',
            filters: {
                script: `       script: |-
          if event.body.a == "b" and event.body.d.e == "z" then return true else return false end`,
                // dataLogicalOperator: 'and', data: [{ path: '', type: '', value: [], comparator: '', template: '' }],

            },
            transform: { jq: '', script: '' }
        }],
        triggers: [
            {
                template: {
                    name: '',
                    k8s: {
                        operation: ''
                    },

                    argoWorkflow: {
                        operation: '',
                        source: {
                            resource: {

                            }
                        },

                    }

                }
            }
        ],


    }
} satisfies IoArgoprojSensorV1Alpha1Sensor)

const k = new Workflow('', {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Workflow',
    metadata: {
        clusterName: '',
        name: '',
        namespace: '',
        labels: {

        },
        annotations: {

        }
    },
    spec: {
        templates: [
            {
                dag: {
                    tasks: [{ when: "n", name: '' }]
                }
            }
        ]


    }
})



const p = new Workflow('', {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Workflow',
    metadata: {
        clusterName: '',
        name: '',
        namespace: '',
        labels: {},
        annotations: {},
    },
    status: {},
    spec: {
        serviceAccountName: '',
        onExit: 'cache-store',
        entrypoint: '',
        artifactRepositoryRef: { configMap: '', key: '' },
        // metrics:{
        //     // prometheus: [{}]
        // },
        artifactGC: {
            strategy: 'OnWorkflowCompletion' satisfies 'OnWorkflowCompletion' | 'OnWorkflowDeletion' | 'Never'
        },

        /* 
            - metadata:
        name: work
      spec:
        accessModes: [ ReadWriteOnce ]
        resources:
          requests:
            storage: 64Mi
         */
        volumeClaimTemplates: [{ metadata: { name: 'work' }, spec: { accessModes: ['ReadWriteOnce'], resources: { requests: { storage: '64Mi' satisfies Memory, cpu: '1' } } } }],

        templates: [
            {
                failFast: true,
                // synchronization:{
                //     semaphore
                // },

                name: '',
                // script: {},
                nodeSelector: { '': '' },
                // outputs: { artifacts: [{ s3: { key:'{{workflow.uid}}-{{workflowworkflow.uid}}.txt', endpoint: '', bucket: '', accessKeySecret: { key: '', name: '', optional: false }, createBucketIfNotPresent: { objectLocking: true } }, name: '' }] },
                inputs: {
                    artifacts: [
                        {
                            name: '',
                            path: '',
                            git: {
                                repo: '',
                                revision: 'master',
                                branch: '',
                                fetch: [],
                                sshPrivateKeySecret: {
                                    name: '',
                                    key: '',
                                    // optional: false
                                },
                                usernameSecret: {
                                    name: '',
                                    key: '',
                                    // optional: false
                                },
                                passwordSecret: {
                                    name: '',
                                    key: '',
                                    // optional: false
                                },
                                // depth: 1
                            },

                            // optional

                            s3: {

                                // useSDKCreds
                            }
                        },
                        {
                            name: '',
                            path: '',
                            // artifactGC:{strategy: },
                            optional: true,
                            s3: {

                                endpoint: ' ',
                                bucket: '',
                                insecure: true,
                                key: '',
                                secretKeySecret: { name: '', key: '', optional: false },
                                accessKeySecret: { name: '', key: '', optional: false }
                            }
                        }
                    ]

                },
                outputs: {
                    artifacts: [{
                        name: '',
                        path: '',
                        subPath: '',
                        artifactGC: {},
                        // optional: false,
                        // archive: { none: {} },
                        s3: {
                            endpoint: '',
                            bucket: '',
                            key: '',
                            encryptionOptions: {
                                enableEncryption: false
                            },
                            insecure: true,
                            region: '',
                            useSDKCreds: true,
                            // encryptionOptions: { enableEncryption: true },
                            createBucketIfNotPresent: {
                                objectLocking: true,
                                // enabled: true,
                                // region: ''
                            },
                            accessKeySecret: {
                                name: '',
                                key: '',
                                // optional: false
                            },
                            secretKeySecret: {
                                name: '',
                                key: ''
                            },
                        },
                        // archive:{tar: {compressionLevel: 1}}
                    }]
                },
                // memoize: {
                //     key: '',
                //     cache: {
                //         configMap: {key: ''}
                //     }
                // },
                // retryStrategy: {
                //     limit: '3',
                // },
                container: {
                    // volumeMounts:[{subPath}],
                    name: '',
                    image: '',
                    command: [],
                    args: [],
                    workingDir: '',
                    securityContext: { privileged: true },
                    resources: {
                        limits: {
                            memory: '32Mi',
                            cpu: '100m'
                        },
                        requests: {
                            memory: '32Mi',
                            cpu: '100m'
                        }
                    }
                },
                // dag: {
                //     tasks: [{ name: '' }],
                // },
                steps: [
                    [
                        {
                            name: '',
                            template: '',
                            continueOn: {
                                failed: true,
                            },
                            onExit: '',
                            hooks: {
                                exit: {
                                    template: 'http',
                                },
                                running: {
                                    expression: 'workflow.status == "Running"',
                                    arguments: {},
                                    template: 'http'
                                },
                                succeeded: {
                                    expression: 'workflow.status == "Succeeded"',
                                    arguments: {
                                        parameters: [
                                            { name: "WORKFLOW_NAME", value: "{{workflow.name}}" },
                                            { name: "WORKFLOW_STATUS", value: "{{workflow.status}}" },
                                        ]
                                    },
                                    template: 'http'
                                },
                                failed: {
                                    expression: 'workflow.status == "Failed"',
                                    arguments: {},
                                    template: 'http'
                                },
                                timeout: {
                                    expression: 'workflow.status == "TimedOut"',
                                    arguments: {},
                                    template: 'http'
                                },
                            },
                            // templateRef: {},
                            arguments: {
                                // artifacts: [{
                                //     name: '', from: '', archive: {
                                //         tar: {
                                //             compressionLevel: 1
                                //         }
                                //     }
                                // }],
                                parameters: []
                            },
                        },
                    ],
                    [{
                        // These two nested together will be run in parallel
                        name: '',
                        template: '',
                        arguments: {
                            parameters: []
                        }
                    }, {
                        name: 'step2',
                        template: 'hello-linux',
                        arguments: {
                            parameters: []
                        },
                    }],
                ],
            },
        ],
    },
} satisfies IoArgoprojWorkflowV1Alpha1Workflow)

const kk = {
    "apiVersion": "argoproj.io/v1alpha1",
    "kind": "Workflow",
    "metadata": {
        "generateName": "hello-hybrid-"
    },
    "spec": {
        "entrypoint": "mytemplate",
        "templates": [
            {
                "name": "mytemplate",
                "steps": [
                    [
                        {
                            "name": "step1",
                            "template": "hello-win"
                        }
                    ],
                    [
                        {
                            "name": "step2",
                            "template": "hello-linux"
                        }
                    ]
                ]
            },
            {
                "name": "hello-win",
                "nodeSelector": {
                    "kubernetes.io/os": "windows"
                },
                "container": {
                    "image": "mcr.microsoft.com/windows/nanoserver:1809",
                    "command": [
                        "cmd",
                        "/c"
                    ],
                    "args": [
                        "echo",
                        "Hello from Windows Container!"
                    ]
                }
            },
            {
                "name": "hello-linux",
                "nodeSelector": {
                    "kubernetes.io/os": "linux"
                },
                "container": {
                    "image": "alpine",
                    "command": [
                        "echo"
                    ],
                    "args": [
                        "Hello from Linux Container!"
                    ]
                }
            }
        ]
    }
} satisfies IoArgoprojWorkflowV1Alpha1Workflow
/* 

apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: hello-hybrid-
spec:
  entrypoint: mytemplate
  templates:
    - name: mytemplate
      steps:
        - - name: step1
            template: hello-win
        - - name: step2
            template: hello-linux

    - name: hello-win
      nodeSelector:
        kubernetes.io/os: windows
      container:
        image: mcr.microsoft.com/windows/nanoserver:1809
        command: ["cmd", "/c"]
        args: ["echo", "Hello from Windows Container!"]
    - name: hello-linux
      nodeSelector:
        kubernetes.io/os: linux
      container:
        image: alpine
        command: [echo]
        args: ["Hello from Linux Container!"]

*/