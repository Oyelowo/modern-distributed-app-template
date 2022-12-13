import { PlainSecretsManager } from "./utils/plainSecretsManager.js";
import { syncCrdsCode } from "./utils/syncCrdsCode.js";
import { syncEtcHostsWithCustomHosts } from "./utils/syncEtcHostsWithCustomHosts.js";

async function main() {
	syncEtcHostsWithCustomHosts();

	PlainSecretsManager.syncAll();
	syncCrdsCode();
}

await main();
