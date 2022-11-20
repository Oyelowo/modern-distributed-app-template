import { getIngressUrl } from '../src/infrastructure/ingress/hosts.ts';

import sh from 'shelljs';

import yargs from 'yargs';
import { ENVIRONMENTS_ALL } from './utils/shared.ts';

export const ARGV = yargs(Deno.args.slice(2))
    .options({
        environment: {
            alias: 'e',
            choices: ENVIRONMENTS_ALL,
            describe: 'environment',
            demandOption: true,
        },
    })
    .parseSync();

sh.exec(`echo ${getIngressUrl({ environment: ARGV.environment })}`);
