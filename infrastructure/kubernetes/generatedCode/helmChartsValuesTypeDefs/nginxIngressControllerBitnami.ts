// Don't Edit. This is autogenerated.
export interface INginxIngressControllerBitnami {
	global: Global;
	kubeVersion: string;
	nameOverride: string;
	fullnameOverride: string;
	namespaceOverride: string;
	commonLabels: CommonLabels;
	commonAnnotations: CommonLabels;
	extraDeploy: any[];
	clusterDomain: string;
	image: Image;
	containerPorts: ContainerPorts;
	hostAliases: any[];
	config: CommonLabels;
	proxySetHeaders: CommonLabels;
	addHeaders: CommonLabels;
	defaultBackendService: string;
	electionID: string;
	reportNodeInternalIp: boolean;
	watchIngressWithoutClass: boolean;
	ingressClassResource: IngressClassResource;
	publishService: PublishService;
	scope: Scope;
	configMapNamespace: string;
	tcpConfigMapNamespace: string;
	udpConfigMapNamespace: string;
	maxmindLicenseKey: string;
	dhParam: string;
	tcp: CommonLabels;
	udp: CommonLabels;
	command: any[];
	args: any[];
	lifecycleHooks: CommonLabels;
	extraArgs: CommonLabels;
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	kind: string;
	daemonset: Daemonset;
	replicaCount: number;
	updateStrategy: CommonLabels;
	revisionHistoryLimit: number;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext;
	minReadySeconds: number;
	resources: Resources;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonLabels;
	customReadinessProbe: CommonLabels;
	customStartupProbe: CommonLabels;
	lifecycle: CommonLabels;
	podLabels: CommonLabels;
	podAnnotations: CommonLabels;
	priorityClassName: string;
	schedulerName: string;
	hostNetwork: boolean;
	dnsPolicy: string;
	terminationGracePeriodSeconds: number;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonLabels;
	nodeSelector: CommonLabels;
	tolerations: any[];
	extraVolumes: any[];
	extraVolumeMounts: any[];
	initContainers: any[];
	sidecars: any[];
	customTemplate: CustomTemplate;
	topologySpreadConstraints: any[];
	podSecurityPolicy: PodSecurityPolicy;
	defaultBackend: DefaultBackend;
	service: Service2;
	serviceAccount: ServiceAccount;
	rbac: Rbac;
	pdb: Pdb;
	autoscaling: Autoscaling;
	metrics: Metrics;
}
interface Metrics {
	enabled: boolean;
	service: Service3;
	serviceMonitor: ServiceMonitor;
	prometheusRule: PrometheusRule;
}
interface PrometheusRule {
	enabled: boolean;
	additionalLabels: CommonLabels;
	namespace: string;
	rules: any[];
}
interface ServiceMonitor {
	enabled: boolean;
	namespace: string;
	jobLabel: string;
	interval: string;
	scrapeTimeout: string;
	relabelings: any[];
	metricRelabelings: any[];
	selector: CommonLabels;
	annotations: CommonLabels;
	labels: CommonLabels;
	honorLabels: boolean;
}
interface Service3 {
	type: string;
	ports: Ports2;
	annotations: Annotations;
	labels: CommonLabels;
}
interface Annotations {
	"prometheus.io/scrape": string;
	"prometheus.io/port": string;
}
interface Ports2 {
	metrics: number;
}
interface Autoscaling {
	enabled: boolean;
	minReplicas: number;
	maxReplicas: number;
	targetCPU: string;
	targetMemory: string;
}
interface Rbac {
	create: boolean;
	rules: any[];
}
interface ServiceAccount {
	create: boolean;
	name: string;
	annotations: CommonLabels;
	automountServiceAccountToken: boolean;
}
interface Service2 {
	type: string;
	ports: HostPorts;
	targetPorts: TargetPorts;
	nodePorts: NodePorts;
	annotations: CommonLabels;
	labels: CommonLabels;
	clusterIP: string;
	externalIPs: any[];
	loadBalancerIP: string;
	loadBalancerSourceRanges: any[];
	extraPorts: any[];
	externalTrafficPolicy: string;
	healthCheckNodePort: number;
	sessionAffinity: string;
	sessionAffinityConfig: CommonLabels;
}
interface NodePorts {
	http: string;
	https: string;
	tcp: CommonLabels;
	udp: CommonLabels;
}
interface TargetPorts {
	http: string;
	https: string;
}
interface DefaultBackend {
	enabled: boolean;
	hostAliases: any[];
	image: Image;
	extraArgs: CommonLabels;
	containerPort: number;
	serverBlockConfig: string;
	replicaCount: number;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext2;
	resources: Resources;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customStartupProbe: CommonLabels;
	customLivenessProbe: CommonLabels;
	customReadinessProbe: CommonLabels;
	podLabels: CommonLabels;
	podAnnotations: CommonLabels;
	priorityClassName: string;
	schedulerName: string;
	terminationGracePeriodSeconds: number;
	topologySpreadConstraints: any[];
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	command: any[];
	args: any[];
	lifecycleHooks: CommonLabels;
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	extraVolumes: any[];
	extraVolumeMounts: any[];
	sidecars: any[];
	initContainers: any[];
	affinity: CommonLabels;
	nodeSelector: CommonLabels;
	tolerations: any[];
	service: Service;
	pdb: Pdb;
}
interface Pdb {
	create: boolean;
	minAvailable: number;
	maxUnavailable: string;
}
interface Service {
	type: string;
	ports: Ports;
	annotations: CommonLabels;
}
interface Ports {
	http: number;
}
interface ContainerSecurityContext2 {
	enabled: boolean;
	runAsUser: number;
	runAsNonRoot: boolean;
}
interface PodSecurityPolicy {
	enabled: boolean;
}
interface CustomTemplate {
	configMapName: string;
	configMapKey: string;
}
interface NodeAffinityPreset {
	type: string;
	key: string;
	values: any[];
}
interface LivenessProbe {
	enabled: boolean;
	failureThreshold: number;
	initialDelaySeconds: number;
	periodSeconds: number;
	successThreshold: number;
	timeoutSeconds: number;
}
interface Resources {
	limits: CommonLabels;
	requests: CommonLabels;
}
interface ContainerSecurityContext {
	enabled: boolean;
	allowPrivilegeEscalation: boolean;
	runAsUser: number;
	capabilities: Capabilities;
	runAsNonRoot: boolean;
}
interface Capabilities {
	drop: string[];
	add: string[];
}
interface PodSecurityContext {
	enabled: boolean;
	fsGroup: number;
}
interface Daemonset {
	useHostPort: boolean;
	hostPorts: HostPorts;
}
interface HostPorts {
	http: number;
	https: number;
}
interface Scope {
	enabled: boolean;
	namespace: string;
}
interface PublishService {
	enabled: boolean;
	pathOverride: string;
}
interface IngressClassResource {
	name: string;
	enabled: boolean;
	default: boolean;
	controllerClass: string;
	parameters: CommonLabels;
}
interface ContainerPorts {
	http: number;
	https: number;
	metrics: number;
}
interface Image {
	registry: string;
	repository: string;
	tag: string;
	digest: string;
	pullPolicy: string;
	pullSecrets: any[];
}
interface CommonLabels {}
interface Global {
	imageRegistry: string;
	imagePullSecrets: any[];
}
