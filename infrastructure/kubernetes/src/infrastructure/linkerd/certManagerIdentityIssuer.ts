import crds from "../../../generatedCode/crds/index.js";
import { namespaces } from "../../types/ownTypes.js";
import { LINKERD_TRUST_ANCHOR_CERTIFICATE_NAME } from "./certManagerCaIssuer.js";
import { linkerdProvider } from "./settings.js";

// IDENTITY CERTIFICATE WHICH ISSUES THE SECRETS FOR GENERATING CERTIFICATE FOR PODS PROXIES
// NOTE: this should be in linkerd namespace where the identity service
// can use it for pods proxies mutual TLS

/*
# Create an identity certificate signed by our root issuer
 */

const CERTIFICATE_NAME = "linkerd-identity-issuer";
const DNS_NAME_IDENTITY_LINKERD = "identity.linkerd.cluster.local";
export const certificateLinkerdIdentityIssuer =
	new crds.certmanager.v1.Certificate(
		CERTIFICATE_NAME,
		{
			metadata: {
				name: CERTIFICATE_NAME,
				namespace: namespaces.linkerd,
			},
			spec: {
				secretName: CERTIFICATE_NAME,
				duration: "48h",
				renewBefore: "25h",
				issuerRef: {
					name: LINKERD_TRUST_ANCHOR_CERTIFICATE_NAME,
					kind: "ClusterIssuer",
				},
				commonName: DNS_NAME_IDENTITY_LINKERD,
				dnsNames: [DNS_NAME_IDENTITY_LINKERD],
				isCA: true,
				privateKey: {
					algorithm: "ECDSA",
					// size: 256
				},
				usages: ["cert sign", "crl sign", "server auth", "client auth"],
			},
			// Put this in cert manager folder first so, that it can be managed earlier
		},
		{ provider: linkerdProvider },
	);
