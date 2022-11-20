import { ARGV_ENVIRONMENTS } from './utils/argv.ts';
import { KubeObject } from './utils/kubeObject/kubeObject.ts';

/* 
Does not handle sealed secret generation/syncing
*/

async function main() {
    const kubeObject = new KubeObject(ARGV_ENVIRONMENTS.environment);
    await kubeObject.generateManifests();
}

await main();
