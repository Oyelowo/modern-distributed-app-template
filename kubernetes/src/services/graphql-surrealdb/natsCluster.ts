import crds from '../../../generatedCrdsTs/index.ts';
import { graphqlSurrealdbSettings } from './settings.ts';

// For example purpose only
export const graphqlSurrealDbNatsClusterExample = new crds.nats.v1alpha2.NatsCluster('', {
    metadata: graphqlSurrealdbSettings.metadata,
    spec: {
        // maxMsgsPerSubject:
    },
});
