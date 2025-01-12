// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

// Export members:
export * from "./serviceProfile";

// Import resources to register:
import { ServiceProfile } from "./serviceProfile";

const _module = {
	version: utilities.getVersion(),
	construct: (name: string, type: string, urn: string): pulumi.Resource => {
		switch (type) {
			case "kubernetes:linkerd.io/v1alpha2:ServiceProfile":
				return new ServiceProfile(name, <any>undefined, { urn });
			default:
				throw new Error(`unknown resource type ${type}`);
		}
	},
};
pulumi.runtime.registerResourceModule("crds", "linkerd.io/v1alpha2", _module);
