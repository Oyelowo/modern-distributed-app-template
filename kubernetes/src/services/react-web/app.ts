import { ServiceDeployment } from '../../shared/deployment.ts';
import { reactWebSettings } from './settings.ts';

export const reactWeb = new ServiceDeployment('react-web', reactWebSettings);
