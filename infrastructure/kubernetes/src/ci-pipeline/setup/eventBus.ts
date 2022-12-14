import { EventBus } from "../../../generatedCode/crds/argoproj/v1alpha1/eventBus.js";
import { IoArgoprojEventbusV1Alpha1 } from "../../../generatedCode/crdsMissingSchemas/argo-events.js";
import { CPU, Memory, namespaces } from "../../types/ownTypes.js";

// Necessary for events to work
export const eventBustCiPipeline = new EventBus("ci-pipeline", {
	apiVersion: "argoproj.io/v1alpha1",
	metadata: {
		name: "default",
		// TODO: Check if this should be moved to argo event folder or
		// if it makes sense to have multiple instances of event bus
		// and keep one for ci pipeline
		namespace: namespaces.argoEvent,
	},
	spec: {
		nats: {
			native: {
				// Optional, defaults to 3. If it is< 3, set it to 3, that is the minimal requirement.
				replicas: 3,
				auth: "token",
				containerTemplate: {
					resources: {
						requests: {
							cpu: "10m" satisfies CPU,
						},
					},
				},
				metricsContainerTemplate: {
					resources: {
						requests: {
							cpu: "10m" satisfies CPU,
						},
					},
				},
				antiAffinity: false,
				persistence: {
					storageClassName: "standard",
					accessMode: "ReadWriteOnce",
					volumeSize: "10Gi" satisfies Memory,
				},
			},
		},
	},
} satisfies IoArgoprojEventbusV1Alpha1);
