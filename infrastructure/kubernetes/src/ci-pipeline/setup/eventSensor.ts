import { Sensor } from "../../../generatedCode/crds/argoproj/v1alpha1/sensor.js";
import { WorkflowArgs } from "../../../generatedCode/crds/argoproj/v1alpha1/workflow.js";
import { IoArgoprojSensorV1Alpha1 } from "../../../generatedCode/crdsMissingSchemas/argo-events.js";
import { IoArgoprojWorkflowV1Alpha1 } from "../../../generatedCode/crdsMissingSchemas/argo-workflows.js";
import { namespaces } from "../../types/ownTypes.js";
import { ciPipelineServiceAccount } from "./accessControl.js";

export const ciPipelineGithubSensor = new Sensor("github", {
	metadata: {
		name: "github",
		namespace: namespaces.ciPipeline,
	},
	spec: {
		eventBusName: "default",
		template: {
			// TODO: Check if using .get method works
			serviceAccountName: ciPipelineServiceAccount.metadata.name.get(),
		},
		dependencies: [
			{
				name: "test-dep",
				eventSourceName: "github",
				eventName: "modern-app",
				transform: {
					//   This is a luascript. You use double hyphen(--) to comment in lua
					script: `
                    function printf(...) print(string.format(...)) end

                    local function array_contains_value (tab, val)
                        for index, value in ipairs(tab) do
                            if value == val then
                                return true
                            end
                        end
                        return false
                    end

                    function string.starts(String,Start)
                    return string.sub(String,1,string.len(Start))==Start
                    end

                    local function any_starts_with (tab, val)
                        if tab == nil then
                            return nil
                        end

                        for index, value in ipairs(tab) do
                            if string.starts(value, val) then
                                return true
                            end
                        end
                        return false
                    end

                    local actions = { "opened" , "edited", "reopened", "synchronize" }
                    is_master_branch = event.body.ref == "refs/heads/master"
                    is_main_branch = event.body.ref == "refs/heads/main"

                    local is_default_branch = ( (event.body["X-GitHub-Event"] == "push") and (is_master_branch or is_main_branch) )

                    local is_pull_request = (
                        (array_contains_value(actions, event.body.action)) and 
                        (event.body["X-GitHub-Event"] == "pull_request") and 
                        (event.body.pull_request.state == "open") and
                        ((event.body.pull_request.base.ref == "master") or (event.body.pull_request.base.ref == "main"))
                        )

                    event.body_custom = {}
                    event.body_custom.html_url = event.body.repository.html_url
                    event.body_custom.ssh_url = event.body.repository.ssh_url
                    event.body_custom.clone_url = event.body.repository.clone_url
                    event.body_custom.repository_name = event.body.repository.name
                    event.body_custom.repository_full_name = event.body.repository.full_name
                    event.body_custom.commit_sha = event.body.after

                    event.body_custom.is_default_branch = is_default_branch
                    event.body_custom.is_pull_request = is_pull_request

                    local directory = "typescript/"
                    directory_is_modified = event.body.head_commit and ( 
                                        any_starts_with(event.body.head_commit.modified, directory) or
                                        any_starts_with(event.body.head_commit.added, directory) or
                                        any_starts_with(event.body.head_commit.removed, directory)
                                        )

                    event.body_custom.should_trigger_workflow = (is_default_branch and directory_is_modified) or is_pull_request
                    event.body_custom.ref = event.body.ref
                    
                    if event.body.ref then
                        -- Extract branch name out of ref field value e.g refs/heads/master -> master
                        event.body_custom.branch = string.match(event.body.ref, "([^/]+)$")
                    elseif is_pull_request then
                        event.body_custom.branch = event.body.pull_request.head.ref
                    end


                    printf("Mapped info start=======")
                    printf("directory_is_modified: %s", directory_is_modified)
                    printf("event.body_custom.html_url: %s", event.body_custom.html_url)
                    printf("event.body_custom.ssh_url: %s", event.body_custom.ssh_url)
                    printf("event.body_custom.clone_url: %s", event.body_custom.clone_url)
                    printf("event.body_custom.repository_name: %s", event.body_custom.repository_name)
                    printf("event.body_custom.repository_full_name: %s", event.body_custom.repository_full_name)
                    printf("event.body_custom.is_default_branch: %s", event.body_custom.is_default_branch)
                    printf("event.body_custom.is_pull_request: %s", event.body_custom.is_pull_request)
                    printf("event.body_custom.commit_sha: %s", event.body_custom.commit_sha)
                    printf("event.body_custom.should_trigger_workflow: %s", event.body_custom.should_trigger_workflow)
                    printf("event.body_custom.branch: %s", event.body_custom.branch)
                    printf("event.body_custom.ref: %s", event.body_custom.ref)

                    printf("Mapped info Ending=======")

                    return event
                `,
				},
				filters: {
					//   This is a luascript. You use double hyphen(--) to comment in lua
					script: `
                    print("Filtering!!!")
                    
                    return event.body_custom.should_trigger_workflow
                `,
				},
			},
		],
		triggers: [
			{
				template: {
					name: "argo-workflow-trigger",
					argoWorkflow: {
						operation: "submit",
						args: [
							// '--node-field-selector',
							// 'phase=abc'
						],
						source: {
							resource: {
								apiVersion: "argoproj.io/v1alpha1",
								kind: "Workflow",
								metadata: {
									generateName: "github-ci-pipe-",
									namespace: namespaces.ciPipeline,
								},
								spec: {
									serviceAccountName: "sa-typescript-ci-workflow",
									arguments: {
										parameters: [
											{
												name: "pr-title",
											},
											{
												name: "pr-number",
											},
											{
												name: "short-sha",
											},
										],
									},
									workflowTemplateRef: {
										// TODO: update accordingly. There should also be for rust, kubernetes etc.
										name: "typescript-ci",
									},
								},
							} satisfies WorkflowArgs,
						},
						parameters: [
							{
								src: {
									dependencyName: "test-dep",
									dataKey: "body_custom.clone_url",
								},
								dest: "spec.arguments.parameters.0.value",
							},
							{
								src: {
									dependencyName: "test-dep",
									dataKey: "body_custom.branch",
								},
								dest: "spec.arguments.parameters.1.value",
							},
							{
								src: {
									dependencyName: "test-dep",
									dataKey: "{{ .Input.body_custom.commit_sha | substr 0 7 }}",
								},
								dest: "spec.arguments.parameters.2.value",
							},
						],
					},
				},
				retryStrategy: {
					steps: 3,
				},
			},
		],
	},
} satisfies IoArgoprojSensorV1Alpha1);
