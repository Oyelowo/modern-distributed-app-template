// Don't Edit. This is autogenerated.
export interface ICiliumCilium {
	debug: Debug;
	rbac: Rbac;
	imagePullSecrets?: any;
	cluster: Cluster;
	serviceAccounts: ServiceAccounts;
	terminationGracePeriodSeconds: number;
	agent: boolean;
	name: string;
	rollOutCiliumPods: boolean;
	image: Image;
	affinity: Affinity;
	nodeSelector: NodeSelector;
	tolerations: Toleration[];
	priorityClassName: string;
	dnsPolicy: string;
	extraArgs: any[];
	extraEnv: any[];
	extraHostPathMounts: any[];
	extraVolumes: any[];
	extraVolumeMounts: any[];
	extraConfig: Annotations;
	podAnnotations: Annotations;
	podLabels: Annotations;
	resources: Annotations;
	securityContext: SecurityContext;
	updateStrategy: UpdateStrategy;
	aksbyocni: Debug;
	autoDirectNodeRoutes: boolean;
	annotateK8sNode: boolean;
	azure: Debug;
	alibabacloud: Debug;
	bandwidthManager: BandwidthManager;
	bgp: Bgp;
	bgpControlPlane: Debug;
	bpf: Bpf;
	cleanBpfState: boolean;
	cleanState: boolean;
	waitForKubeProxy: boolean;
	cni: Cni;
	containerRuntime: ContainerRuntime;
	customCalls: Debug;
	datapathMode: string;
	daemon: Daemon;
	enableRuntimeDeviceDetection: boolean;
	enableCnpStatusUpdates: boolean;
	enableK8sEventHandover: boolean;
	enableCiliumEndpointSlice: boolean;
	ingressController: IngressController;
	enableXTSocketFallback: boolean;
	encryption: Encryption;
	endpointHealthChecking: Debug;
	endpointStatus: EndpointStatus;
	endpointRoutes: Debug;
	eni: Eni;
	externalIPs: Debug;
	gke: Debug;
	healthChecking: boolean;
	healthPort: number;
	hostFirewall: Debug;
	hostPort: Debug;
	socketLB: Debug;
	certgen: Certgen;
	hubble: Hubble;
	identityAllocationMode: string;
	installIptablesRules: boolean;
	installNoConntrackIptablesRules: boolean;
	ipam: Ipam;
	ipMasqAgent: Debug;
	ipv4: Debug;
	ipv6: Debug;
	k8s: Annotations;
	keepDeprecatedLabels: boolean;
	keepDeprecatedProbes: boolean;
	startupProbe: StartupProbe;
	livenessProbe: StartupProbe;
	readinessProbe: StartupProbe;
	kubeProxyReplacementHealthzBindAddr: string;
	l2NeighDiscovery: L2NeighDiscovery;
	l7Proxy: boolean;
	localRedirectPolicy: boolean;
	logSystemLoad: boolean;
	maglev: Annotations;
	enableIPv4Masquerade: boolean;
	enableIPv6Masquerade: boolean;
	egressGateway: EgressGateway;
	vtep: Vtep;
	monitor: Debug;
	nodePort: NodePort;
	policyEnforcementMode: string;
	pprof: Debug;
	prometheus: Prometheus2;
	proxy: Proxy;
	remoteNodeIdentity: boolean;
	resourceQuotas: ResourceQuotas;
	sleepAfterInit: boolean;
	sockops: Debug;
	svcSourceRangeCheck: boolean;
	synchronizeK8sNodes: boolean;
	tls: Tls5;
	tunnel: string;
	disableEndpointCRD: string;
	wellKnownIdentities: Debug;
	etcd: Etcd;
	operator: Operator2;
	nodeinit: Nodeinit;
	preflight: Preflight;
	enableCriticalPriorityClass: boolean;
	clustermesh: Clustermesh;
	externalWorkloads: Debug;
	cgroup: Cgroup;
	enableK8sTerminatingEndpoint: boolean;
	agentNotReadyTaintKey: string;
	dnsProxy: DnsProxy;
}
interface DnsProxy {
	dnsRejectResponseCode: string;
	enableDnsCompression: boolean;
	endpointMaxIpPerHostname: number;
	idleConnectionGracePeriod: string;
	maxDeferredConnectionDeletes: number;
	minTtl: number;
	preCache: string;
	proxyPort: number;
	proxyResponseMaxDelay: string;
}
interface Cgroup {
	autoMount: Debug;
	hostRoot: string;
}
interface Clustermesh {
	useAPIServer: boolean;
	config: Config;
	apiserver: Apiserver;
}
interface Apiserver {
	image: Image;
	etcd: Etcd2;
	service: Service2;
	replicas: number;
	extraEnv: any[];
	podAnnotations: Annotations;
	podLabels: Annotations;
	podDisruptionBudget: PodDisruptionBudget;
	resources: Annotations;
	affinity: Affinity;
	nodeSelector: NodeSelector;
	tolerations: any[];
	updateStrategy: UpdateStrategy;
	priorityClassName: string;
	tls: Tls6;
}
interface Tls6 {
	auto: Auto2;
	ca: Ca;
	server: Server;
	admin: Ca;
	client: Ca;
	remote: Ca;
}
interface Auto2 {
	enabled: boolean;
	method: string;
	certValidityDuration: number;
	certManagerIssuerRef: Annotations;
}
interface Service2 {
	type: string;
	nodePort: number;
	annotations: Annotations;
}
interface Etcd2 {
	image: Image2;
}
interface Config {
	enabled: boolean;
	domain: string;
	clusters: any[];
}
interface Preflight {
	enabled: boolean;
	image: Image;
	priorityClassName: string;
	updateStrategy: UpdateStrategy3;
	extraEnv: any[];
	affinity: Affinity2;
	nodeSelector: NodeSelector;
	tolerations: Toleration2[];
	podAnnotations: Annotations;
	podLabels: Annotations;
	podDisruptionBudget: PodDisruptionBudget;
	resources: Annotations;
	securityContext: Annotations;
	tofqdnsPreCache: string;
	terminationGracePeriodSeconds: number;
	validateCNPs: boolean;
}
interface Toleration2 {
	key: string;
	effect?: string;
	value?: string;
	operator?: string;
}
interface Nodeinit {
	enabled: boolean;
	image: Image2;
	priorityClassName: string;
	updateStrategy: UpdateStrategy3;
	extraEnv: any[];
	affinity: Annotations;
	nodeSelector: NodeSelector;
	tolerations: Toleration[];
	podAnnotations: Annotations;
	podLabels: Annotations;
	resources: Resources;
	securityContext: SecurityContext3;
	bootstrapFile: string;
}
interface SecurityContext3 {
	privileged: boolean;
	seLinuxOptions: SeLinuxOptions;
	capabilities: Capabilities;
}
interface Capabilities {
	add: string[];
}
interface SeLinuxOptions {
	level: string;
	type: string;
}
interface Resources {
	requests: Requests;
}
interface Requests {
	cpu: string;
	memory: string;
}
interface UpdateStrategy3 {
	type: string;
}
interface Operator2 {
	enabled: boolean;
	rollOutPods: boolean;
	image: Image3;
	replicas: number;
	priorityClassName: string;
	dnsPolicy: string;
	updateStrategy: UpdateStrategy2;
	affinity: Affinity3;
	nodeSelector: NodeSelector;
	tolerations: Toleration[];
	extraArgs: any[];
	extraEnv: any[];
	extraHostPathMounts: any[];
	extraVolumes: any[];
	extraVolumeMounts: any[];
	podAnnotations: Annotations;
	podLabels: Annotations;
	podDisruptionBudget: PodDisruptionBudget;
	resources: Annotations;
	securityContext: Annotations;
	endpointGCInterval: string;
	nodeGCInterval: string;
	identityGCInterval: string;
	identityHeartbeatTimeout: string;
	prometheus: Prometheus4;
	skipCRDCreation: boolean;
	removeNodeTaints: boolean;
	setNodeNetworkStatus: boolean;
	unmanagedPodWatcher: UnmanagedPodWatcher;
}
interface UnmanagedPodWatcher {
	restart: boolean;
	intervalSeconds: number;
}
interface Prometheus4 {
	enabled: boolean;
	port: number;
	serviceMonitor: ServiceMonitor;
}
interface Affinity3 {
	podAntiAffinity: PodAntiAffinity2;
}
interface PodAntiAffinity2 {
	requiredDuringSchedulingIgnoredDuringExecution: RequiredDuringSchedulingIgnoredDuringExecution2[];
}
interface RequiredDuringSchedulingIgnoredDuringExecution2 {
	topologyKey: string;
	labelSelector: LabelSelector2;
}
interface LabelSelector2 {
	matchLabels: MatchLabels2;
}
interface MatchLabels2 {
	"io.cilium/app": string;
}
interface Image3 {
	override?: any;
	repository: string;
	tag: string;
	genericDigest: string;
	azureDigest: string;
	awsDigest: string;
	alibabacloudDigest: string;
	useDigest: boolean;
	pullPolicy: string;
	suffix: string;
}
interface Etcd {
	enabled: boolean;
	image: Image2;
	priorityClassName: string;
	extraArgs: any[];
	tolerations: Toleration[];
	nodeSelector: NodeSelector;
	podAnnotations: Annotations;
	podLabels: Annotations;
	podDisruptionBudget: PodDisruptionBudget;
	resources: Annotations;
	securityContext: Annotations;
	updateStrategy: UpdateStrategy2;
	k8sService: boolean;
	clusterDomain: string;
	endpoints: string[];
	ssl: boolean;
}
interface UpdateStrategy2 {
	type: string;
	rollingUpdate: RollingUpdate2;
}
interface RollingUpdate2 {
	maxSurge: number;
	maxUnavailable: number;
}
interface Tls5 {
	secretsBackend: string;
	ca: Ca2;
}
interface Ca2 {
	cert: string;
	key: string;
	certValidityDuration: number;
}
interface ResourceQuotas {
	enabled: boolean;
	cilium: Cilium2;
	operator: Cilium2;
}
interface Cilium2 {
	hard: Hard;
}
interface Hard {
	pods: string;
}
interface Proxy {
	prometheus: Prometheus3;
	sidecarImageRegex: string;
}
interface Prometheus3 {
	enabled: boolean;
	port: string;
}
interface Prometheus2 {
	enabled: boolean;
	port: number;
	serviceMonitor: ServiceMonitor;
	metrics?: any;
}
interface NodePort {
	enabled: boolean;
	bindProtection: boolean;
	autoProtectPortRange: boolean;
	enableHealthCheck: boolean;
}
interface Vtep {
	enabled: boolean;
	endpoint: string;
	cidr: string;
	mask: string;
	mac: string;
}
interface EgressGateway {
	enabled: boolean;
	installRoutes: boolean;
}
interface L2NeighDiscovery {
	enabled: boolean;
	refreshPeriod: string;
}
interface StartupProbe {
	failureThreshold: number;
	periodSeconds: number;
}
interface Ipam {
	mode: string;
	operator: Operator;
}
interface Operator {
	clusterPoolIPv4PodCIDR: string;
	clusterPoolIPv4PodCIDRList: any[];
	clusterPoolIPv4MaskSize: number;
	clusterPoolIPv6PodCIDR: string;
	clusterPoolIPv6PodCIDRList: any[];
	clusterPoolIPv6MaskSize: number;
}
interface Hubble {
	enabled: boolean;
	metrics: Metrics;
	socketPath: string;
	listenAddress: string;
	peerService: PeerService;
	tls: Tls;
	relay: Relay;
	ui: Ui;
}
interface Ui {
	enabled: boolean;
	standalone: Standalone;
	rollOutPods: boolean;
	tls: Tls4;
	backend: Backend;
	frontend: Frontend;
	replicas: number;
	podAnnotations: Annotations;
	podLabels: Annotations;
	podDisruptionBudget: PodDisruptionBudget;
	affinity: Annotations;
	nodeSelector: NodeSelector;
	tolerations: any[];
	priorityClassName: string;
	updateStrategy: UpdateStrategy;
	securityContext: SecurityContext2;
	service: Service;
	ingress: Ingress;
}
interface Ingress {
	enabled: boolean;
	annotations: Annotations;
	className: string;
	hosts: string[];
	tls: any[];
}
interface SecurityContext2 {
	enabled: boolean;
	runAsUser: number;
	runAsGroup: number;
	fsGroup: number;
}
interface Frontend {
	image: Image2;
	extraEnv: any[];
	resources: Annotations;
	server: Server3;
}
interface Server3 {
	ipv6: Debug;
}
interface Backend {
	image: Image2;
	extraEnv: any[];
	resources: Annotations;
}
interface Tls4 {
	client: Ca;
}
interface Standalone {
	enabled: boolean;
	tls: Tls3;
}
interface Tls3 {
	certsVolume: Annotations;
}
interface Relay {
	enabled: boolean;
	rollOutPods: boolean;
	image: Image;
	resources: Annotations;
	replicas: number;
	affinity: Affinity2;
	nodeSelector: NodeSelector;
	tolerations: any[];
	extraEnv: any[];
	podAnnotations: Annotations;
	podLabels: Annotations;
	podDisruptionBudget: PodDisruptionBudget;
	priorityClassName: string;
	terminationGracePeriodSeconds: number;
	updateStrategy: UpdateStrategy;
	securityContext: Annotations;
	service: Service;
	listenHost: string;
	listenPort: string;
	tls: Tls2;
	dialTimeout?: any;
	retryTimeout?: any;
	sortBufferLenMax?: any;
	sortBufferDrainTimeout?: any;
	prometheus: Prometheus;
}
interface Prometheus {
	enabled: boolean;
	port: number;
	serviceMonitor: ServiceMonitor2;
}
interface ServiceMonitor2 {
	enabled: boolean;
	labels: Annotations;
	annotations: Annotations;
	interval: string;
	metricRelabelings?: any;
}
interface Tls2 {
	client: Ca;
	server: Server2;
}
interface Server2 {
	enabled: boolean;
	cert: string;
	key: string;
	extraDnsNames: any[];
	extraIpAddresses: any[];
}
interface Service {
	type: string;
	nodePort: number;
}
interface PodDisruptionBudget {
	enabled: boolean;
	minAvailable?: any;
	maxUnavailable: number;
}
interface Affinity2 {
	podAffinity: PodAntiAffinity;
}
interface Tls {
	enabled: boolean;
	auto: Auto;
	ca: Ca;
	server: Server;
}
interface Server {
	cert: string;
	key: string;
	extraDnsNames: any[];
	extraIpAddresses: any[];
}
interface Ca {
	cert: string;
	key: string;
}
interface Auto {
	enabled: boolean;
	method: string;
	certValidityDuration: number;
	schedule: string;
	certManagerIssuerRef: Annotations;
}
interface PeerService {
	enabled: boolean;
	targetPort: number;
	clusterDomain: string;
}
interface Metrics {
	enabled?: any;
	port: number;
	serviceAnnotations: Annotations;
	serviceMonitor: ServiceMonitor;
}
interface ServiceMonitor {
	enabled: boolean;
	labels: Annotations;
	annotations: Annotations;
	metricRelabelings?: any;
}
interface Certgen {
	image: Image2;
	ttlSecondsAfterFinished: number;
	podLabels: Annotations;
	tolerations: any[];
}
interface Image2 {
	override?: any;
	repository: string;
	tag: string;
	pullPolicy: string;
}
interface Eni {
	enabled: boolean;
	updateEC2AdapterLimitViaAPI: boolean;
	awsReleaseExcessIPs: boolean;
	awsEnablePrefixDelegation: boolean;
	ec2APIEndpoint: string;
	eniTags: Annotations;
	iamRole: string;
	subnetIDsFilter: string;
	subnetTagsFilter: string;
	instanceTagsFilter: string;
}
interface EndpointStatus {
	enabled: boolean;
	status: string;
}
interface Encryption {
	enabled: boolean;
	type: string;
	nodeEncryption: boolean;
	ipsec: Ipsec;
	wireguard: Wireguard;
	keyFile: string;
	mountPath: string;
	secretName: string;
	interface: string;
}
interface Wireguard {
	userspaceFallback: boolean;
}
interface Ipsec {
	keyFile: string;
	mountPath: string;
	secretName: string;
	interface: string;
}
interface IngressController {
	enabled: boolean;
	enforceHttps: boolean;
	ingressLBAnnotationPrefixes: string[];
	secretsNamespace: SecretsNamespace;
}
interface SecretsNamespace {
	create: boolean;
	name: string;
	sync: boolean;
}
interface Daemon {
	runPath: string;
}
interface ContainerRuntime {
	integration: string;
}
interface Cni {
	install: boolean;
	chainingMode: string;
	exclusive: boolean;
	logFile: string;
	customConf: boolean;
	confPath: string;
	binPath: string;
	configMapKey: string;
	confFileMountPath: string;
	hostConfDirMountPath: string;
}
interface Bpf {
	root: string;
	clockProbe: boolean;
	preallocateMaps: boolean;
	lbMapMax: number;
	policyMapMax: number;
	monitorAggregation: string;
	monitorInterval: string;
	monitorFlags: string;
	lbExternalClusterIP: boolean;
}
interface Bgp {
	enabled: boolean;
	announce: Announce;
}
interface Announce {
	loadbalancerIP: boolean;
	podCIDR: boolean;
}
interface BandwidthManager {
	enabled: boolean;
	bbr: boolean;
}
interface UpdateStrategy {
	type: string;
	rollingUpdate: RollingUpdate;
}
interface RollingUpdate {
	maxUnavailable: number;
}
interface SecurityContext {
	privileged: boolean;
	extraCapabilities: string[];
}
interface Toleration {
	operator: string;
}
interface NodeSelector {
	"kubernetes.io/os": string;
}
interface Affinity {
	podAntiAffinity: PodAntiAffinity;
}
interface PodAntiAffinity {
	requiredDuringSchedulingIgnoredDuringExecution: RequiredDuringSchedulingIgnoredDuringExecution[];
}
interface RequiredDuringSchedulingIgnoredDuringExecution {
	topologyKey: string;
	labelSelector: LabelSelector;
}
interface LabelSelector {
	matchLabels: MatchLabels;
}
interface MatchLabels {
	"k8s-app": string;
}
interface Image {
	override?: any;
	repository: string;
	tag: string;
	pullPolicy: string;
	digest: string;
	useDigest: boolean;
}
interface ServiceAccounts {
	cilium: Cilium;
	etcd: Cilium;
	operator: Cilium;
	preflight: Cilium;
	relay: Cilium;
	ui: Cilium;
	clustermeshApiserver: Cilium;
	clustermeshcertgen: Cilium;
	hubblecertgen: Cilium;
}
interface Cilium {
	create: boolean;
	name: string;
	annotations: Annotations;
}
interface Annotations {}
interface Cluster {
	name: string;
	id: number;
}
interface Rbac {
	create: boolean;
}
interface Debug {
	enabled: boolean;
}
