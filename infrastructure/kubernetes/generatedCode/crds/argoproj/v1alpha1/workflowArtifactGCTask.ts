// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

import { ObjectMeta } from "../../meta/v1";

export class WorkflowArtifactGCTask extends pulumi.CustomResource {
	/**
	 * Get an existing WorkflowArtifactGCTask resource's state with the given name, ID, and optional extra
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
	): WorkflowArtifactGCTask {
		return new WorkflowArtifactGCTask(name, undefined as any, {
			...opts,
			id: id,
		});
	}

	/** @internal */
	public static readonly __pulumiType =
		"kubernetes:argoproj.io/v1alpha1:WorkflowArtifactGCTask";

	/**
	 * Returns true if the given object is an instance of WorkflowArtifactGCTask.  This is designed to work even
	 * when multiple copies of the Pulumi SDK have been loaded into the same process.
	 */
	public static isInstance(obj: any): obj is WorkflowArtifactGCTask {
		if (obj === undefined || obj === null) {
			return false;
		}
		return obj["__pulumiType"] === WorkflowArtifactGCTask.__pulumiType;
	}

	public readonly apiVersion!: pulumi.Output<
		"argoproj.io/v1alpha1" | undefined
	>;
	public readonly kind!: pulumi.Output<"WorkflowArtifactGCTask" | undefined>;
	public readonly metadata!: pulumi.Output<ObjectMeta>;
	public readonly spec!: pulumi.Output<{ [key: string]: any }>;
	public readonly status!: pulumi.Output<{ [key: string]: any } | undefined>;

	/**
	 * Create a WorkflowArtifactGCTask resource with the given unique name, arguments, and options.
	 *
	 * @param name The _unique_ name of the resource.
	 * @param args The arguments to use to populate this resource's properties.
	 * @param opts A bag of options that control this resource's behavior.
	 */
	constructor(
		name: string,
		args?: WorkflowArtifactGCTaskArgs,
		opts?: pulumi.CustomResourceOptions,
	) {
		let resourceInputs: pulumi.Inputs = {};
		opts = opts || {};
		if (!opts.id) {
			resourceInputs["apiVersion"] = "argoproj.io/v1alpha1";
			resourceInputs["kind"] = "WorkflowArtifactGCTask";
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
		super(WorkflowArtifactGCTask.__pulumiType, name, resourceInputs, opts);
	}
}

/**
 * The set of arguments for constructing a WorkflowArtifactGCTask resource.
 */
export interface WorkflowArtifactGCTaskArgs {
	apiVersion?: pulumi.Input<"argoproj.io/v1alpha1">;
	kind?: pulumi.Input<"WorkflowArtifactGCTask">;
	metadata?: pulumi.Input<ObjectMeta>;
	spec?: pulumi.Input<{ [key: string]: any }>;
	status?: pulumi.Input<{ [key: string]: any }>;
}
