// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import { input as inputs, output as outputs } from "../../types";
import * as utilities from "../../utilities";

import { ObjectMeta } from "../../meta/v1";

/**
 * ServerStatusRequest is a request to access current status information about the Velero server.
 */
export class ServerStatusRequest extends pulumi.CustomResource {
	/**
	 * Get an existing ServerStatusRequest resource's state with the given name, ID, and optional extra
	 * properties used to qualify the lookup.
	 *
	 * @param name The _unique_ name of the resulting resource.
	 * @param id The _unique_ provider ID of the resource to lookup.
	 * @param opts Optional settings to control the behavior of the CustomResource.
	 */
	public static get(
		name: string,
		id: pulumi.Input<pulumi.ID>,
		opts?: pulumi.CustomResourceOptions,
	): ServerStatusRequest {
		return new ServerStatusRequest(name, undefined as any, { ...opts, id: id });
	}

	/** @internal */
	public static readonly __pulumiType =
		"kubernetes:velero.io/v1:ServerStatusRequest";

	/**
	 * Returns true if the given object is an instance of ServerStatusRequest.  This is designed to work even
	 * when multiple copies of the Pulumi SDK have been loaded into the same process.
	 */
	public static isInstance(obj: any): obj is ServerStatusRequest {
		if (obj === undefined || obj === null) {
			return false;
		}
		return obj["__pulumiType"] === ServerStatusRequest.__pulumiType;
	}

	public readonly apiVersion!: pulumi.Output<"velero.io/v1" | undefined>;
	public readonly kind!: pulumi.Output<"ServerStatusRequest" | undefined>;
	public readonly metadata!: pulumi.Output<ObjectMeta | undefined>;
	/**
	 * ServerStatusRequestSpec is the specification for a ServerStatusRequest.
	 */
	public readonly spec!: pulumi.Output<{ [key: string]: any } | undefined>;
	/**
	 * ServerStatusRequestStatus is the current status of a ServerStatusRequest.
	 */
	public readonly status!: pulumi.Output<
		outputs.velero.v1.ServerStatusRequestStatus | undefined
	>;

	/**
	 * Create a ServerStatusRequest resource with the given unique name, arguments, and options.
	 *
	 * @param name The _unique_ name of the resource.
	 * @param args The arguments to use to populate this resource's properties.
	 * @param opts A bag of options that control this resource's behavior.
	 */
	constructor(
		name: string,
		args?: ServerStatusRequestArgs,
		opts?: pulumi.CustomResourceOptions,
	) {
		let resourceInputs: pulumi.Inputs = {};
		opts = opts || {};
		if (!opts.id) {
			resourceInputs["apiVersion"] = "velero.io/v1";
			resourceInputs["kind"] = "ServerStatusRequest";
			resourceInputs["metadata"] = args ? args.metadata : undefined;
			resourceInputs["spec"] = args ? args.spec : undefined;
			resourceInputs["status"] = args ? args.status : undefined;
		} else {
			resourceInputs["apiVersion"] = undefined /*out*/;
			resourceInputs["kind"] = undefined /*out*/;
			resourceInputs["metadata"] = undefined /*out*/;
			resourceInputs["spec"] = undefined /*out*/;
			resourceInputs["status"] = undefined /*out*/;
		}
		opts = pulumi.mergeOptions(utilities.resourceOptsDefaults(), opts);
		super(ServerStatusRequest.__pulumiType, name, resourceInputs, opts);
	}
}

/**
 * The set of arguments for constructing a ServerStatusRequest resource.
 */
export interface ServerStatusRequestArgs {
	apiVersion?: pulumi.Input<"velero.io/v1">;
	kind?: pulumi.Input<"ServerStatusRequest">;
	metadata?: pulumi.Input<ObjectMeta>;
	/**
	 * ServerStatusRequestSpec is the specification for a ServerStatusRequest.
	 */
	spec?: pulumi.Input<{ [key: string]: any }>;
	/**
	 * ServerStatusRequestStatus is the current status of a ServerStatusRequest.
	 */
	status?: pulumi.Input<inputs.velero.v1.ServerStatusRequestStatusArgs>;
}
