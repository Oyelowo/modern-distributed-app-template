// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

// Export members:
export * from "./natsCluster";
export * from "./natsServiceRole";

// Import resources to register:
import { NatsCluster } from "./natsCluster";
import { NatsServiceRole } from "./natsServiceRole";

const _module = {
    version: utilities.getVersion(),
    construct: (name: string, type: string, urn: string): pulumi.Resource => {
        switch (type) {
            case "kubernetes:nats.io/v1alpha2:NatsCluster":
                return new NatsCluster(name, <any>undefined, { urn })
            case "kubernetes:nats.io/v1alpha2:NatsServiceRole":
                return new NatsServiceRole(name, <any>undefined, { urn })
            default:
                throw new Error(`unknown resource type ${type}`);
        }
    },
};
pulumi.runtime.registerResourceModule("crds", "nats.io/v1alpha2", _module)