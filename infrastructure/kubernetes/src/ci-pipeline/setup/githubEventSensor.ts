import { Ingress } from "@pulumi/kubernetes/networking/v1/index.js";
import { NginxConfiguration } from "../../types/nginxConfigurations.js";
import { namespaces } from "../../types/ownTypes.js";


export const githubSensorIngress = new Ingress("", {
    apiVersion: "networking.k8s.io/v1",
    kind: 'Ingress',
    metadata: {
        name: 'ci-pipeline',
        namespace: namespaces.ciPipeline,
        annotations: {
            "nginx.ingress.kubernetes.io/ssl-redirect": "false",
            "nginx.ingress.kubernetes.io/use-regex": "true",
            "nginx.ingress.kubernetes.io/rewrite-target": "/",

        } satisfies NginxConfiguration
    },
    spec: {
        ingressClassName: 'nginx',
        rules: [
            {
                host: '139-144-160-239.ip.linodeusercontent.com',
                http: {
                    paths: [
                        {
                            // - path: / argo - events
                            path: '/',
                            pathType: 'Prefix',
                            backend: {
                                service: {
                                    name: 'github-eventsource-svc',
                                    port: {
                                        number: 12000
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        ]
    }
})