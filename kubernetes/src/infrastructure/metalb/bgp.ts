import crds from '../../../generatedCrdsTs/index.ts';
import { metalbProvider } from './settings.ts';

// TODO:
export const btpAdvert = new crds.metallb.v1beta1.BGPAdvertisement(
    'bgpAdvert',
    {
        spec: {},
    },
    { provider: metalbProvider }
);
