// INFRASTRUCTURE
export * from './src/infrastructure/namespaces/index.ts';
export * from './src/infrastructure/argocd/index.ts';
export * from './src/infrastructure/argoEvent/index.ts';
export * from './src/infrastructure/argoWorkflows/index.ts';
export * from './src/infrastructure/argoRollout/index.ts';
export * from './src/infrastructure/tikvOperator/index.ts';
export * from './src/infrastructure/cert-manager/index.ts';
export * from './src/infrastructure/ingress/index.ts';
export * from './src/infrastructure/linkerd/index.ts';
export * from './src/infrastructure/sealed-secrets/index.ts';
export * from './src/infrastructure/seaweedfs/index.ts';
export * from './src/infrastructure/longhorn/index.ts';
export * from './src/infrastructure/metalb/index.ts';
export * from './src/infrastructure/cilium/index.ts';
export * from './src/infrastructure/monitoring/index.ts';
export * from './src/infrastructure/harbor/index.ts';
export * from './src/infrastructure/velero/index.ts';

// SERVICES
// Rust server backend with support for graphql, surrealdb and redis
// RUST WORKSPACE APPS
export * from './src/services/graphql-surrealdb/index.ts';
// TYPESCRIPT WORKSPACE APPS
// Web app. Nextjs with client and server support. Server is at /api
export * from './src/services/react-web/index.ts';
