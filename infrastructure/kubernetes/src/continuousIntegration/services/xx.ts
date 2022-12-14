// import {} from "../"

import {
	Sensor,
	Workflow,
	WorkflowTemplate,
} from "../../../generatedCode/crds/argoproj/v1alpha1/index.js";
import { HttpWorkflowsArgoprojIoWorkflowsJson } from "../../../generatedCode/crdsMissingSchemas/argo-workflows.js";
// import { WorkflowTemplate } from "../../../generatedCode/crds/argoproj/v1alpha1/workflowTemplate.js";

new WorkflowTemplate("ere", {
	apiVersion: "argoproj.io/v1alpha1",
	kind: "WorkflowTemplate",
	spec: {},
} satisfies HttpWorkflowsArgoprojIoWorkflowsJson);
new Sensor("", {
	apiVersion: "argoproj.io/v1alpha1",
	kind: "Sensor",
	spec: {},
});
new Workflow("", {
	apiVersion: "argoproj.io/v1alpha1",
	kind: "Workflow",
	spec: {
		templates: [
			{
				dag: {
					// tasks: [{// hooks},],
					tasks: [],
				},
				steps: [],
			},
		],
	},
});
