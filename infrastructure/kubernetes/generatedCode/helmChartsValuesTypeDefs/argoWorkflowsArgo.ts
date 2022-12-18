// Don't Edit. This is autogenerated.
export interface IArgoWorkflowsArgo {
	images: Images;
	crds: Crds;
	createAggregateRoles: boolean;
	nameOverride?: any;
	fullnameOverride?: any;
	kubeVersionOverride: string;
	singleNamespace: boolean;
	workflow: Workflow;
	controller: Controller;
	mainContainer: MainContainer;
	executor: Executor;
	server: Server;
	extraObjects: any[];
	useDefaultArtifactRepo: boolean;
	useStaticCredentials: boolean;
	artifactRepository: ArtifactRepository;
}
interface ArtifactRepository {
	archiveLogs: boolean;
	s3: S3;
	gcs: Annotations;
	azure: Annotations;
}
interface S3 {
	accessKeySecret: AccessKeySecret;
	secretKeySecret: AccessKeySecret;
	insecure: boolean;
}
interface AccessKeySecret {
	key: string;
}
interface Server {
	enabled: boolean;
	baseHref: string;
	image: Image;
	deploymentAnnotations: Annotations;
	podAnnotations: Annotations;
	podLabels: Annotations;
	podSecurityContext: Annotations;
	rbac: Rbac;
	securityContext: SecurityContext;
	name: string;
	serviceType: string;
	servicePort: number;
	serviceNodePort?: any;
	servicePortName: string;
	serviceAccount: ServiceAccount;
	serviceAnnotations: Annotations;
	serviceLabels: Annotations;
	loadBalancerIP: string;
	loadBalancerSourceRanges: any[];
	resources: Annotations;
	replicas: number;
	pdb: Pdb;
	nodeSelector: NodeSelector;
	tolerations: any[];
	affinity: Annotations;
	priorityClassName: string;
	secure: boolean;
	extraEnv: any[];
	extraArgs: any[];
	volumeMounts: any[];
	volumes: any[];
	ingress: Ingress;
	clusterWorkflowTemplates: ClusterWorkflowTemplates;
	sso: Annotations;
	extraContainers: any[];
}
interface ClusterWorkflowTemplates {
	enabled: boolean;
	enableEditing: boolean;
}
interface Ingress {
	enabled: boolean;
	annotations: Annotations;
	labels: Annotations;
	ingressClassName: string;
	hosts: any[];
	paths: string[];
	pathType: string;
	extraPaths: any[];
	tls: any[];
}
interface Executor {
	image: Image;
	resources: Annotations;
	env: any[];
	securityContext: Annotations;
}
interface MainContainer {
	imagePullPolicy: string;
	resources: Annotations;
	env: any[];
	securityContext: Annotations;
}
interface Controller {
	image: Image;
	parallelism?: any;
	resourceRateLimit: Annotations;
	rbac: Rbac;
	namespaceParallelism?: any;
	initialDelay?: any;
	deploymentAnnotations: Annotations;
	podAnnotations: Annotations;
	podLabels: Annotations;
	podSecurityContext: Annotations;
	metricsConfig: MetricsConfig;
	securityContext: SecurityContext;
	persistence: Annotations;
	workflowDefaults: Annotations;
	workflowWorkers?: any;
	workflowRestrictions: Annotations;
	telemetryConfig: TelemetryConfig;
	serviceMonitor: ServiceMonitor;
	serviceAccount: ServiceAccount;
	name: string;
	workflowNamespaces: string[];
	instanceID: InstanceID;
	logging: Logging;
	serviceType: string;
	serviceAnnotations: Annotations;
	serviceLabels: Annotations;
	loadBalancerSourceRanges: any[];
	resources: Annotations;
	livenessProbe: LivenessProbe;
	extraEnv: any[];
	extraArgs: any[];
	volumeMounts: any[];
	volumes: any[];
	replicas: number;
	pdb: Pdb;
	nodeSelector: NodeSelector;
	tolerations: any[];
	affinity: Annotations;
	priorityClassName: string;
	links: any[];
	navColor: string;
	clusterWorkflowTemplates: Pdb;
	extraContainers: any[];
}
interface NodeSelector {
	"kubernetes.io/os": string;
}
interface Pdb {
	enabled: boolean;
}
interface LivenessProbe {
	httpGet: HttpGet;
	failureThreshold: number;
	initialDelaySeconds: number;
	periodSeconds: number;
	timeoutSeconds: number;
}
interface HttpGet {
	port: number;
	path: string;
}
interface Logging {
	level: string;
	globallevel: string;
}
interface InstanceID {
	enabled: boolean;
	useReleaseName: boolean;
	explicitID: string;
}
interface ServiceMonitor {
	enabled: boolean;
	additionalLabels: Annotations;
	namespace: string;
}
interface TelemetryConfig {
	enabled: boolean;
	path: string;
	port: number;
	metricsTTL: string;
	ignoreErrors: boolean;
	secure: boolean;
	servicePort: number;
	servicePortName: string;
}
interface SecurityContext {
	readOnlyRootFilesystem: boolean;
	runAsNonRoot: boolean;
	allowPrivilegeEscalation: boolean;
	capabilities: Capabilities;
}
interface Capabilities {
	drop: string[];
}
interface MetricsConfig {
	enabled: boolean;
	path: string;
	port: number;
	metricsTTL: string;
	ignoreErrors: boolean;
	secure: boolean;
	portName: string;
	servicePort: number;
	servicePortName: string;
}
interface Image {
	registry: string;
	repository: string;
	tag: string;
}
interface Workflow {
	namespace?: any;
	serviceAccount: ServiceAccount;
	rbac: Rbac;
}
interface Rbac {
	create: boolean;
}
interface ServiceAccount {
	create: boolean;
	annotations: Annotations;
	name: string;
}
interface Crds {
	install: boolean;
	keep: boolean;
	annotations: Annotations;
}
interface Annotations {}
interface Images {
	tag: string;
	pullPolicy: string;
	pullSecrets: any[];
}