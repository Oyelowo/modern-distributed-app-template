// Don't Edit. This is autogenerated.
export interface IHarborBitnami {
	global: Global;
	nameOverride: string;
	fullnameOverride: string;
	kubeVersion: string;
	clusterDomain: string;
	commonAnnotations: CommonAnnotations;
	commonLabels: CommonAnnotations;
	extraDeploy: any[];
	diagnosticMode: DiagnosticMode;
	adminPassword: string;
	externalURL: string;
	proxy: Proxy;
	logLevel: string;
	internalTLS: InternalTLS;
	ipFamily: IpFamily;
	exposureType: string;
	service: Service;
	ingress: Ingress;
	persistence: Persistence;
	tracing: Tracing;
	volumePermissions: VolumePermissions;
	nginx: Nginx;
	portal: Portal;
	core: Core2;
	jobservice: Jobservice;
	registry: Registry2;
	chartmuseum: Chartmuseum;
	notary: Notary;
	trivy: Trivy2;
	exporter: Exporter;
	postgresql: Postgresql;
	externalDatabase: ExternalDatabase;
	redis: Redis;
	externalRedis: ExternalRedis;
	metrics: Metrics;
}
interface Metrics {
	enabled: boolean;
	path: string;
	serviceMonitor: ServiceMonitor;
}
interface ServiceMonitor {
	enabled: boolean;
	namespace: string;
	interval: string;
	scrapeTimeout: string;
	labels: CommonAnnotations;
	selector: CommonAnnotations;
	relabelings: any[];
	metricRelabelings: any[];
	honorLabels: boolean;
	jobLabel: string;
}
interface ExternalRedis {
	host: string;
	port: number;
	password: string;
	coreDatabaseIndex: string;
	jobserviceDatabaseIndex: string;
	registryDatabaseIndex: string;
	chartmuseumDatabaseIndex: string;
	trivyAdapterDatabaseIndex: string;
	sentinel: Sentinel;
}
interface Sentinel {
	enabled: boolean;
	masterSet: string;
	hosts: string;
}
interface Redis {
	enabled: boolean;
	auth: Auth2;
	architecture: string;
}
interface Auth2 {
	enabled: boolean;
	password: string;
	existingSecret: string;
}
interface ExternalDatabase {
	host: string;
	port: number;
	user: string;
	password: string;
	sslmode: string;
	coreDatabase: string;
	notaryServerDatabase: string;
	notaryServerUsername: string;
	notaryServerPassword: string;
	notarySignerDatabase: string;
	notarySignerUsername: string;
	notarySignerPassword: string;
}
interface Postgresql {
	enabled: boolean;
	image: Image3;
	auth: Auth;
	architecture: string;
	primary: Primary;
}
interface Primary {
	extendedConfiguration: string;
	initdb: Initdb;
}
interface Initdb {
	scripts: Scripts;
}
interface Scripts {
	"initial-notaryserver.sql": string;
	"initial-notarysigner.sql": string;
	"initial-registry.sql": string;
}
interface Auth {
	enablePostgresUser: boolean;
	postgresPassword: string;
	existingSecret: string;
}
interface Image3 {
	registry: string;
	repository: string;
	tag: string;
	digest: string;
}
interface Exporter {
	image: Image2;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	containerPorts: ContainerPorts6;
	replicaCount: number;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext2;
	updateStrategy: UpdateStrategy;
	lifecycleHooks: CommonAnnotations;
	hostAliases: any[];
	podLabels: CommonAnnotations;
	podAnnotations: CommonAnnotations;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonAnnotations;
	priorityClassName: string;
	schedulerName: string;
	serviceAccountName: string;
	nodeSelector: CommonAnnotations;
	tolerations: any[];
	topologySpreadConstraints: any[];
	initContainers: any[];
	extraVolumeMounts: any[];
	extraVolumes: any[];
	sidecars: any[];
	automountServiceAccountToken: boolean;
	service: Service5;
}
interface Service5 {
	ports: ContainerPorts6;
}
interface ContainerPorts6 {
	metrics: number;
}
interface Trivy2 {
	image: Image2;
	enabled: boolean;
	debugMode: boolean;
	vulnType: string;
	severity: string;
	ignoreUnfixed: boolean;
	insecure: boolean;
	gitHubToken: string;
	skipUpdate: boolean;
	cacheDir: string;
	tls: Tls2;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	containerPorts: ContainerPorts;
	replicaCount: number;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources2;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext2;
	updateStrategy: UpdateStrategy;
	lifecycleHooks: CommonAnnotations;
	hostAliases: any[];
	podLabels: CommonAnnotations;
	podAnnotations: CommonAnnotations;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonAnnotations;
	nodeSelector: CommonAnnotations;
	tolerations: any[];
	topologySpreadConstraints: any[];
	priorityClassName: string;
	schedulerName: string;
	sidecars: any[];
	initContainers: any[];
	extraVolumeMounts: any[];
	extraVolumes: any[];
	automountServiceAccountToken: boolean;
	service: Service2;
}
interface Resources2 {
	requests: Requests;
	limits: Limits;
}
interface Limits {
	cpu: number;
	memory: string;
}
interface Requests {
	cpu: string;
	memory: string;
}
interface Notary {
	enabled: boolean;
	secretName: string;
	server: Server2;
	signer: Signer;
	service: Service4;
}
interface Service4 {
	ports: Ports2;
}
interface Ports2 {
	server: number;
	signer: number;
}
interface Signer {
	image: Image2;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	containerPorts: ContainerPorts5;
	replicaCount: number;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext2;
	updateStrategy: UpdateStrategy;
	lifecycleHooks: CommonAnnotations;
	hostAliases: any[];
	podLabels: CommonAnnotations;
	podAnnotations: CommonAnnotations;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonAnnotations;
	nodeSelector: CommonAnnotations;
	tolerations: any[];
	topologySpreadConstraints: any[];
	priorityClassName: string;
	schedulerName: string;
	sidecars: any[];
	initContainers: any[];
	extraVolumeMounts: any[];
	extraVolumes: any[];
	automountServiceAccountToken: boolean;
}
interface ContainerPorts5 {
	signer: number;
}
interface Server2 {
	image: Image2;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	containerPorts: ContainerPorts4;
	replicaCount: number;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext2;
	updateStrategy: UpdateStrategy;
	lifecycleHooks: CommonAnnotations;
	hostAliases: any[];
	podLabels: CommonAnnotations;
	podAnnotations: CommonAnnotations;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonAnnotations;
	nodeSelector: CommonAnnotations;
	tolerations: any[];
	topologySpreadConstraints: any[];
	priorityClassName: string;
	schedulerName: string;
	sidecars: any[];
	initContainers: any[];
	extraVolumeMounts: any[];
	extraVolumes: any[];
	automountServiceAccountToken: boolean;
}
interface ContainerPorts4 {
	server: number;
}
interface Chartmuseum {
	image: Image2;
	enabled: boolean;
	useRedisCache: boolean;
	absoluteUrl: boolean;
	chartRepoName: string;
	depth: number;
	logJson: boolean;
	disableMetrics: boolean;
	disableApi: boolean;
	disableStatefiles: boolean;
	allowOverwrite: boolean;
	anonymousGet: boolean;
	contextPath: string;
	indexLimit: string;
	chartPostFormFieldName: string;
	provPostFormFieldName: string;
	maxStorageObjects: string;
	maxUploadSize: string;
	storageTimestampTolerance: string;
	tls: Tls2;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	containerPorts: ContainerPorts;
	replicaCount: number;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext2;
	updateStrategy: UpdateStrategy;
	lifecycleHooks: CommonAnnotations;
	hostAliases: any[];
	podLabels: CommonAnnotations;
	podAnnotations: CommonAnnotations;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonAnnotations;
	nodeSelector: CommonAnnotations;
	tolerations: any[];
	topologySpreadConstraints: any[];
	priorityClassName: string;
	schedulerName: string;
	sidecars: any[];
	initContainers: any[];
	extraVolumeMounts: any[];
	extraVolumes: any[];
	automountServiceAccountToken: boolean;
	service: Service2;
}
interface Registry2 {
	secret: string;
	relativeurls: boolean;
	credentials: Credentials;
	middleware: Middleware;
	tls: Tls2;
	replicaCount: number;
	podSecurityContext: PodSecurityContext;
	updateStrategy: UpdateStrategy;
	hostAliases: any[];
	podLabels: CommonAnnotations;
	podAnnotations: CommonAnnotations;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonAnnotations;
	nodeSelector: CommonAnnotations;
	tolerations: any[];
	topologySpreadConstraints: any[];
	priorityClassName: string;
	schedulerName: string;
	sidecars: any[];
	initContainers: any[];
	extraVolumes: any[];
	automountServiceAccountToken: boolean;
	server: Server;
	controller: Controller;
}
interface Controller {
	image: Image2;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	containerPorts: ContainerPorts;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources;
	containerSecurityContext: ContainerSecurityContext2;
	lifecycleHooks: CommonAnnotations;
	extraVolumeMounts: any[];
	service: Service2;
}
interface Server {
	image: Image2;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	containerPorts: ContainerPorts3;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources;
	containerSecurityContext: ContainerSecurityContext2;
	lifecycleHooks: CommonAnnotations;
	extraVolumeMounts: any[];
	service: Service3;
}
interface ContainerPorts3 {
	http: number;
	https: number;
	debug: number;
	metrics: number;
}
interface Middleware {
	enabled: boolean;
	type: string;
	cloudFront: CloudFront;
}
interface CloudFront {
	baseurl: string;
	keypairid: string;
	duration: string;
	ipfilteredby: string;
	privateKeySecret: string;
}
interface Credentials {
	username: string;
	password: string;
	htpasswd: string;
}
interface Jobservice {
	image: Image2;
	maxJobWorkers: number;
	redisNamespace: string;
	jobLogger: string;
	secret: string;
	tls: Tls2;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	containerPorts: ContainerPorts2;
	replicaCount: number;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext2;
	updateStrategy: UpdateStrategy;
	lifecycleHooks: CommonAnnotations;
	hostAliases: any[];
	podLabels: CommonAnnotations;
	podAnnotations: CommonAnnotations;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonAnnotations;
	nodeSelector: CommonAnnotations;
	tolerations: any[];
	topologySpreadConstraints: any[];
	priorityClassName: string;
	schedulerName: string;
	sidecars: any[];
	initContainers: any[];
	extraVolumeMounts: any[];
	extraVolumes: any[];
	automountServiceAccountToken: boolean;
	service: Service3;
}
interface Core2 {
	image: Image2;
	sessionLifetime: string;
	uaaSecret: string;
	secretKey: string;
	secret: string;
	secretName: string;
	csrfKey: string;
	tls: Tls2;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	configOverwriteJson: string;
	configOverwriteJsonSecret: string;
	containerPorts: ContainerPorts2;
	replicaCount: number;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext2;
	updateStrategy: UpdateStrategy;
	lifecycleHooks: CommonAnnotations;
	hostAliases: any[];
	podLabels: CommonAnnotations;
	podAnnotations: CommonAnnotations;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonAnnotations;
	nodeSelector: CommonAnnotations;
	tolerations: any[];
	topologySpreadConstraints: any[];
	priorityClassName: string;
	schedulerName: string;
	sidecars: any[];
	initContainers: any[];
	extraVolumeMounts: any[];
	extraVolumes: any[];
	automountServiceAccountToken: boolean;
	service: Service3;
}
interface Service3 {
	ports: ContainerPorts2;
}
interface ContainerPorts2 {
	http: number;
	https: number;
	metrics: number;
}
interface Portal {
	image: Image2;
	tls: Tls2;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	containerPorts: ContainerPorts;
	replicaCount: number;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext2;
	updateStrategy: UpdateStrategy;
	lifecycleHooks: CommonAnnotations;
	hostAliases: any[];
	podLabels: CommonAnnotations;
	podAnnotations: CommonAnnotations;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonAnnotations;
	nodeSelector: CommonAnnotations;
	tolerations: any[];
	topologySpreadConstraints: any[];
	priorityClassName: string;
	schedulerName: string;
	sidecars: any[];
	initContainers: any[];
	extraVolumeMounts: any[];
	extraVolumes: any[];
	automountServiceAccountToken: boolean;
	service: Service2;
}
interface Service2 {
	ports: ContainerPorts;
}
interface ContainerPorts {
	http: number;
	https: number;
}
interface Tls2 {
	existingSecret: string;
}
interface Nginx {
	image: Image2;
	tls: Tls;
	behindReverseProxy: boolean;
	command: any[];
	args: any[];
	extraEnvVars: any[];
	extraEnvVarsCM: string;
	extraEnvVarsSecret: string;
	containerPorts: Ports;
	replicaCount: number;
	livenessProbe: LivenessProbe;
	readinessProbe: LivenessProbe;
	startupProbe: LivenessProbe;
	customLivenessProbe: CommonAnnotations;
	customReadinessProbe: CommonAnnotations;
	customStartupProbe: CommonAnnotations;
	resources: Resources;
	podSecurityContext: PodSecurityContext;
	containerSecurityContext: ContainerSecurityContext2;
	updateStrategy: UpdateStrategy;
	lifecycleHooks: CommonAnnotations;
	hostAliases: any[];
	podLabels: CommonAnnotations;
	podAnnotations: CommonAnnotations;
	podAffinityPreset: string;
	podAntiAffinityPreset: string;
	nodeAffinityPreset: NodeAffinityPreset;
	affinity: CommonAnnotations;
	nodeSelector: CommonAnnotations;
	tolerations: any[];
	topologySpreadConstraints: any[];
	priorityClassName: string;
	schedulerName: string;
	sidecars: any[];
	initContainers: any[];
	extraVolumeMounts: any[];
	extraVolumes: any[];
}
interface NodeAffinityPreset {
	type: string;
	key: string;
	values: any[];
}
interface UpdateStrategy {
	type: string;
}
interface ContainerSecurityContext2 {
	enabled: boolean;
	runAsUser: number;
	runAsNonRoot: boolean;
}
interface PodSecurityContext {
	enabled: boolean;
	fsGroup: number;
}
interface LivenessProbe {
	enabled: boolean;
	initialDelaySeconds: number;
	periodSeconds: number;
	timeoutSeconds: number;
	failureThreshold: number;
	successThreshold: number;
}
interface Tls {
	enabled: boolean;
	existingSecret: string;
	commonName: string;
}
interface Image2 {
	registry: string;
	repository: string;
	tag: string;
	digest: string;
	pullPolicy: string;
	pullSecrets: any[];
	debug: boolean;
}
interface VolumePermissions {
	enabled: boolean;
	image: Image;
	resources: Resources;
	containerSecurityContext: ContainerSecurityContext;
}
interface ContainerSecurityContext {
	enabled: boolean;
	runAsUser: number;
}
interface Resources {
	limits: CommonAnnotations;
	requests: CommonAnnotations;
}
interface Image {
	registry: string;
	repository: string;
	tag: string;
	digest: string;
	pullPolicy: string;
	pullSecrets: any[];
}
interface Tracing {
	enabled: boolean;
	sampleRate: number;
	namespace: string;
	attributes: CommonAnnotations;
	jaeger: Jaeger;
	otel: Otel;
}
interface Otel {
	enabled: boolean;
	endpoint: string;
	urlpath: string;
	compression: boolean;
	timeout: string;
	insecure: boolean;
}
interface Jaeger {
	enabled: boolean;
	endpoint: string;
	username: string;
	password: string;
	agentHost: string;
	agentPort: string;
}
interface Persistence {
	enabled: boolean;
	resourcePolicy: string;
	persistentVolumeClaim: PersistentVolumeClaim;
	imageChartStorage: ImageChartStorage;
}
interface ImageChartStorage {
	caBundleSecret: string;
	disableredirect: boolean;
	type: string;
	filesystem: Filesystem;
	azure: Azure;
	gcs: Gcs;
	s3: S3;
	swift: Swift;
	oss: Oss;
}
interface Oss {
	accesskeyid: string;
	accesskeysecret: string;
	region: string;
	bucket: string;
	endpoint: string;
	internal: string;
	encrypt: string;
	secure: string;
	chunksize: string;
	rootdirectory: string;
	secretkey: string;
}
interface Swift {
	authurl: string;
	username: string;
	password: string;
	container: string;
	region: string;
	tenant: string;
	tenantid: string;
	domain: string;
	domainid: string;
	trustid: string;
	insecureskipverify: string;
	chunksize: string;
	prefix: string;
	secretkey: string;
	accesskey: string;
	authversion: string;
	endpointtype: string;
	tempurlcontainerkey: string;
	tempurlmethods: string;
}
interface S3 {
	region: string;
	bucket: string;
	accesskey: string;
	secretkey: string;
	regionendpoint: string;
	encrypt: string;
	keyid: string;
	secure: string;
	skipverify: string;
	v4auth: string;
	chunksize: string;
	rootdirectory: string;
	storageClass: string;
	sse: string;
}
interface Gcs {
	bucket: string;
	encodedkey: string;
	rootdirectory: string;
	chunksize: string;
}
interface Azure {
	accountname: string;
	accountkey: string;
	container: string;
	storagePrefix: string;
	realm: string;
}
interface Filesystem {
	rootdirectory: string;
	maxthreads: string;
}
interface PersistentVolumeClaim {
	registry: Registry;
	jobservice: Registry;
	chartmuseum: Registry;
	trivy: Trivy;
}
interface Trivy {
	storageClass: string;
	accessModes: string[];
	size: string;
	annotations: CommonAnnotations;
	selector: CommonAnnotations;
}
interface Registry {
	existingClaim: string;
	storageClass: string;
	subPath: string;
	accessModes: string[];
	size: string;
	annotations: CommonAnnotations;
	selector: CommonAnnotations;
}
interface Ingress {
	core: Core;
	notary: Core;
}
interface Core {
	ingressClassName: string;
	pathType: string;
	apiVersion: string;
	controller: string;
	hostname: string;
	annotations: Annotations;
	tls: boolean;
	selfSigned: boolean;
	extraHosts: any[];
	extraPaths: any[];
	extraTls: any[];
	secrets: any[];
	extraRules: any[];
}
interface Annotations {
	"ingress.kubernetes.io/ssl-redirect": string;
	"ingress.kubernetes.io/proxy-body-size": string;
	"nginx.ingress.kubernetes.io/ssl-redirect": string;
	"nginx.ingress.kubernetes.io/proxy-body-size": string;
}
interface Service {
	type: string;
	ports: Ports;
	nodePorts: NodePorts;
	sessionAffinity: string;
	sessionAffinityConfig: CommonAnnotations;
	clusterIP: string;
	loadBalancerIP: string;
	loadBalancerSourceRanges: any[];
	externalTrafficPolicy: string;
	annotations: CommonAnnotations;
	extraPorts: any[];
}
interface NodePorts {
	http: string;
	https: string;
	notary: string;
}
interface Ports {
	http: number;
	https: number;
	notary: number;
}
interface IpFamily {
	ipv6: Ipv6;
	ipv4: Ipv6;
}
interface Ipv6 {
	enabled: boolean;
}
interface InternalTLS {
	enabled: boolean;
	caBundleSecret: string;
}
interface Proxy {
	httpProxy: string;
	httpsProxy: string;
	noProxy: string;
	components: string[];
}
interface DiagnosticMode {
	enabled: boolean;
	command: string[];
	args: string[];
}
interface CommonAnnotations {}
interface Global {
	imageRegistry: string;
	imagePullSecrets: any[];
	storageClass: string;
}
