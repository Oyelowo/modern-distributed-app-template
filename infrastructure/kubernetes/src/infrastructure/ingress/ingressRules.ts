import { getIngressUrlHost } from "./hosts.js";
import * as k8s from "@pulumi/kubernetes";
import { namespaces } from "../../types/ownTypes.js";
import { reactWebSettings } from "../../services/react-web/settings.js";
import {
	INGRESS_CLASSNAME_NGINX,
	NginxConfiguration,
} from "../../types/nginxConfigurations.js";
import { getEnvVarsForKubeManifests } from "../../shared/environmentVariablesForManifests.js";
import { CLUSTER_ISSUER_NAME } from "../cert-manager/index.js";
import { nginxIngressProvider } from "./settings.js";
import { graphqlSurrealdbSettings } from "../../services/graphql-surrealdb/settings.js";

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

const SECRET_NAME_NGINX = "nginx-ingress-tls";

const name = "oyelowo-ingress";

type CertManagerAnnotations = {
	// NOTE: Make sure you specify the right one, if using cluster-issuer, use `cluster-issuer` annotations, otherwise, use `issuer`
	// which is namespaced
	"cert-manager.io/cluster-issuer": typeof CLUSTER_ISSUER_NAME;
	"cert-manager.io/issuer": string; // We don't yet have an issuer. We are still using cluster issuer
};

type IngressAnnotations = NginxConfiguration & CertManagerAnnotations;
export const annotations: Partial<IngressAnnotations> = {
	// 'nginx.ingress.kubernetes.io/ssl-redirect': isLocal ? 'false' : 'true',
	"nginx.ingress.kubernetes.io/ssl-redirect": "false",
	"nginx.ingress.kubernetes.io/use-regex": "true",
	"cert-manager.io/cluster-issuer": CLUSTER_ISSUER_NAME,
	// 'nginx.ingress.kubernetes.io/enable-cors': isLocal ? 'false' : 'true',
};

export const appIngress = new k8s.networking.v1.Ingress(
	name,
	{
		metadata: {
			name,
			namespace: namespaces.applications,
			annotations: annotations as Record<string, string>,
		},
		spec: {
			ingressClassName: INGRESS_CLASSNAME_NGINX,
			tls: [
				{
					hosts: [getIngressUrlHost({ environment: ENVIRONMENT })],
					secretName: SECRET_NAME_NGINX,
				},
			],
			rules: [
				{
					// NOTE: The convention I intend to follow is to see each service as a Unit(i.e Frontend and backend)
					// 1:1 mapping i.e 1 domain/subdomain =>  Unit(i.e Frontend and backend)
					// Frontent served at base route and come last, while backend served at /api and come first to match specifically.
					// e.g if you have two services:
					// For service a... servicea.mydomain.com   => Frontend(serivea.mydomain.com), Backend(servicea.mydomain.com/api)
					// For service b... servicea.mydomain.com   => Frontend(seriveb.mydomain.com), Backend(serviceb.mydomain.com/api)
					host: getIngressUrlHost({ environment: ENVIRONMENT }),
					http: {
						paths: [
							// Put the specific Path first before the base path below where the frontend is served
							{
								pathType: "Prefix",
								path: "/api",
								backend: {
									service: {
										name: graphqlSurrealdbSettings.metadata.name,
										port: {
											number: Number(graphqlSurrealdbSettings.envVars.APP_PORT),
										},
									},
								},
							},
							{
								pathType: "Prefix",
								path: "/",
								backend: {
									service: {
										name: reactWebSettings.metadata.name,
										port: { number: Number(reactWebSettings.envVars.APP_PORT) },
									},
								},
							},
						],
					},
				},
				// {
				//     host: hosts[ENVIRONMENT].another-service,
				//     http: {
				//         paths: [
				//             {
				//                 pathType: 'Prefix',
				//                 path: '/',
				//                 backend: {
				//                     service: {
				//                         name: ..,
				//                         port: ..,
				//                     },
				//                 },
				//             },
				//         ],
				//     },
				// },
			],
		},
	},
	{ provider: nginxIngressProvider },
);
