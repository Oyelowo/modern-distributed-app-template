// import {} from "../"

import {
	Sensor,
	Workflow,
} from "../../../generatedCrdsTs/argoproj/v1alpha1/index.js";
import { WorkflowTemplate } from "../../../generatedCrdsTs/argoproj/v1alpha1/workflowTemplate.js";

new WorkflowTemplate("ere", { apiVersion: "argoproj.io/v1alpha1", spec: {} });
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
					tasks: [
						{
							hooks: [],
							// hooks: [{ expression: "" }]
						},
					],
				},
			},
		],
	},
});
