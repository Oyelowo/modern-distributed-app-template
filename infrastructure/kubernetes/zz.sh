 pnpm  quicktype -s schema https://raw.githubusercontent.com/argoproj/argo-events/master/api/jsonschema/schema.json -o zz.ts


 curl  https://raw.githubusercontent.com/argoproj/argo-events/master/api/jsonschema/schema.json | pnpm json2ts  -o zzz.ts