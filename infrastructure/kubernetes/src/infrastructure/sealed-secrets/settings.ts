import { getResourceProvider } from "../../shared/directoriesManager.js";
import { ResourceName } from "../../types/ownTypes.js";
import { getEnvVarsForKubeManifests } from "../../shared/environmentVariablesForManifests.js";

const { ENVIRONMENT } = getEnvVarsForKubeManifests();

export const sealedSecretsResourceName: ResourceName = "sealed-secrets";
export const sealedSecretsProvider = getResourceProvider({
	outputDirectory: "infrastructure/sealed-secrets",
	environment: ENVIRONMENT,
});
