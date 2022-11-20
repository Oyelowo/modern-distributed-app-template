import { PlainSecretsManager } from './utils/plainSecretsManager.ts';
import { syncCrdsCode } from './utils/syncCrdsCode.ts';
import { syncEtcHostsWithCustomHosts } from './utils/syncEtcHostsWithCustomHosts.ts';
import { syncHelmChartTypesDeclarations } from './utils/syncHelmChartTypesDeclarations.ts';

async function main() {
    syncEtcHostsWithCustomHosts();
    syncHelmChartTypesDeclarations();

    PlainSecretsManager.syncAll();
    syncCrdsCode();
}

await main();
