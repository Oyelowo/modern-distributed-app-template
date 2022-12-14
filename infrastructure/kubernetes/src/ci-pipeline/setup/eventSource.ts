import { EventSource } from "../../../generatedCode/crds/argoproj/v1alpha1/eventSource.js";
import { IoArgoprojEventsourceV1Alpha1 } from "../../../generatedCode/crdsMissingSchemas/argo-events.js";
import { namespaces } from "../../types/ownTypes.js";

// NOTE: in the future, I may decide to replace github with gitea for also
// source control management. Right now, gitea is being used to store services container
// images or cache third party images so we don't have to always fetch
// or helm chart image. It's expected to also vendor all these artifacts
// The good news is that gitea and github share very similar APIs,
// so, we most likely can just use as a dropin replacement.
const EVENT_SOURCE: 'github' | 'gitea' = "github"

const ciPipelineEventSource = new EventSource("", {
    apiVersion: "argoproj.io/v1alpha1",
    metadata: {
        name: "github" satisfies typeof EVENT_SOURCE,
        namespace: namespaces.ciPipeline,
    },
    spec: {
        service: {
            ports: [{
                name: "modern-app",
                // TODO: Make into a constant also shared witht he ci pipeline ingress
                port: 12000,
                targetPort: 12000,

            }]
        },
        github: {
            "modern-app": {
                repositories: [{
                    owner: 'oyelowo',
                    names: [
                        // TODO: Make this into a global config constant to fetch from there
                        // so you can quickly get a birds eye view of customisable configs 
                        'modern-distributed-app-template'
                    ],
                    /* 
                                        # - argo-events
                      # - argo-workflows
            # Github application auth. Instead of using personal token `apiToken` use app PEM
            #     githubApp:
            #       privateKey:
            #         name: github-app-pem
            #         key: privateKey.pem
            #       appID: <app id>
            #       installationID: <app installation id>
                    */

                },],
                webhook: {
                    endpoint: '/push',
                    port: '12000',
                    method: 'POST',
                    url: 'http://139-144-160-239.ip.linodeusercontent.com'
                },
                //  following listens to everything, hence *
                //  You can find more info on https://developer.github.com/v3/activity/events/types/
                events: [
                    '*'
                ],
                /* 
             apiToken refers to K8s secret that stores the github api token
             if apiToken is provided controller will create webhook on GitHub repo
             +optional
                 */
                apiToken: {
                    // Name of the K8s secret that contains the access token
                    name: 'github-secrets',
                    // name: 'github-access',
                    //Key within the K8s secret whose corresponding value (must be base64 encoded) is access token
                    key: 'password',
                    // key: 'token',

                },
                // webhookSecret refers to K8s secret that stores the github hook secret
                // Optional
                // webhookSecret: {
                //     // Name of the K8s secret that contains the hook secret
                //     name: 'github-secrets',
                //     // Key within the K8s secret whose corresponding value (must be base64 encoded) is hook secret
                //     key: 'secret'
                // },
                /*
                type of the connection between event-source and Github.
                You should set it to false to avoid man-in-the-middle and other attacks.
                TODO: change to secure*/
                insecure: true,
                //  Determines if notifications are sent when the webhook is triggered
                active: true,
                contentType: 'json'
            },
        }
    }
} satisfies IoArgoprojEventsourceV1Alpha1)
