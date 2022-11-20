import { promptEnvironmentSelection } from './utils/shared.ts';
import { setupCluster } from './utils/setupCluster.ts';

/* 
Expects that the cluster is already running and in user's local
machine context
*/

async function main() {
    const { environment } = await promptEnvironmentSelection();

    await setupCluster(environment);
}

await main();
