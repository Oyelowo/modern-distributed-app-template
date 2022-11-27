import { Chain, chainOptions, ZeusScalars } from "./zeus/index.js";
export * from "./zeus/index.js";
import { Temporal } from "@js-temporal/polyfill";

export class Uuid {
	private constructor(private uuid_str: string) {}
	static fromString = (str: string) => {
		return new Uuid(str);
	};

	toString = () => {
		return new Uuid(this.uuid_str).uuid_str;
	};
}

// TODO: Use proper encoding/decoding
export const scalarsCustom = ZeusScalars({
	UUID: {
		encode: (e: Uuid) => e.toString(),
		decode: (e: string) => Uuid.fromString(e),
	},
	DateTime: {
		encode: (e: Temporal.Instant) => Temporal.Instant.from(e).toString(),
		decode: (e: string) => Temporal.Instant.from(e),
	},
});

const chain = Chain("http://localhost:8000");
const query = chain("query");
export const mutation = chain("mutation", { scalars: scalarsCustom });
export const subscription = chain("subscription", { scalars: scalarsCustom });

export const graphqlApi = {
	query,
	mutation,
	subscription,
};
