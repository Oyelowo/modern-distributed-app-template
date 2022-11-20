import c from 'chalk';
// import fs from 'node:fs';
import inquirer from 'inquirer';
import sh, { ShellString } from 'shelljs';
import yargs from 'yargs';
import { Environment } from '../../src/types/ownTypes.ts';
import _ from "lodash";

export function isFileEmpty(fileName: string, ignoreWhitespace = true): boolean {
    const decoder = new TextDecoder("utf-8");
    const data = Deno.readFileSync(fileName);
    return _.isEmpty(decoder.decode(data).trim());
}

export function handleShellError(shellCommand: ShellString) {
    if (shellCommand.stderr) {
        console.log(c.bgRedBright(shellCommand.stderr));
        sh.exit(-1);
    }
    return shellCommand;
}

export const ENVIRONMENTS_ALL: Environment[] = ['local', 'production', 'staging', 'development'];
export async function promptEnvironmentSelection() {
    const choices = ENVIRONMENTS_ALL.flatMap((env) => [env, new inquirer.Separator()]);

    const name = 'environment';
    const answers: Record<typeof name, Environment> = await inquirer.prompt([
        {
            type: 'list',
            name,
            message: c.greenBright('🆘Select the environment ‼️‼️‼️‼️'),
            choices,
            default: ENVIRONMENTS_ALL[0],
            pageSize: 20,
        } as const,
    ]);

    return answers;
}

export const getArgvEnvironments = () =>
    yargs(Deno.args.slice(2))
        .options({
            environment: {
                alias: 'e',
                choices: ENVIRONMENTS_ALL,
                describe: "The environment you're generating the manifests for.",
                demandOption: true,
            },
        })
        .parseSync();
