import sh from 'shelljs';
import { promptKubernetesClusterSwitch } from './utils/promptKubernetesClusterSwitch.ts';
import { promptSecretsDeletionConfirmations } from './utils/promptSecretsDeletionConfirmations.ts';
import { KubeObject } from './utils/kubeObject/kubeObject.ts';
import { promptEnvironmentSelection } from './utils/shared.ts';
import { PlainSecretsManager } from './utils/plainSecretsManager.ts';

async function main() {
    const { environment } = await promptEnvironmentSelection();
    await promptKubernetesClusterSwitch(environment);
    const { deletPlainJsonSecretsInput, deleteUnsealedSecretManifestsOutput } =
        await promptSecretsDeletionConfirmations();

    const kubeObject = new KubeObject(environment);

    await kubeObject.generateManifests();
    PlainSecretsManager.syncAll();

    // This requires the cluster to be on and switch to its context
    await kubeObject.syncSealedSecretsWithPrompt();

    if (deletPlainJsonSecretsInput) {
        PlainSecretsManager.resetValues();
    }

    if (deleteUnsealedSecretManifestsOutput) {
        kubeObject.getOfAKind('Secret').forEach(({ path }) => {
            sh.rm('-rf', path);
        });
    }
}

await main();
