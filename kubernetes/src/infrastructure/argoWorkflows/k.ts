import { Workflow } from "../../../generatedCrdsTs/argoproj/v1alpha1/workflow.js";
import type { IoArgoprojWorkflowV1Alpha1Workflow, MySchema } from "./type.js";
// import { FromSchema } from "json-schema-to-ts";


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


    }
})

const p = {
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
        entrypoint: '',
        // metrics:{
        //     // prometheus: [{}]
        // },
        artifactGC: {
            strategy: 'OnWorkflowCompletion' satisfies 'OnWorkflowCompletion' | 'OnWorkflowDeletion' | 'Never'
        },
        templates: [
            {
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
                            }
                        }
                    ]
                },
                container: {
                    name: '',
                    image: '',
                    command: [],
                    args: [],
                    resources: {
                        limits: {
                            memory: '32Mi',
                            cpu: '100m'
                        },
                        requests: {
                            // memory: '32Mi',
                            // cpu: '100m'
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

    }
} satisfies Required<IoArgoprojWorkflowV1Alpha1Workflow>

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