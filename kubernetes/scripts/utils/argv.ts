import * as path from 'path';
import yargs from 'yargs';
import { getMainBaseDir } from '../../src/shared/directoriesManager.ts';
import { ENVIRONMENTS_ALL } from '../utils/shared.ts';

export const ARGV_ENVIRONMENTS = yargs(Deno.args.slice(2))
    .options({
        environment: {
            alias: 'e',
            choices: ENVIRONMENTS_ALL,
            describe: "The environment you're generating the manifests for.",
            demandOption: true,
        },
    })
    .parseSync();

const mainDir = getMainBaseDir();

export const tsConfigPath = path.join(mainDir, 'tsconfig.pulumi.json');
