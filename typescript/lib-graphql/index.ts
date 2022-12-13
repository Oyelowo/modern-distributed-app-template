import { Chain, chainOptions, ZeusScalars } from "./zeus/index.js";
export * from "./zeus/index.js";
import { Temporal } from "@js-temporal/polyfill";

export class Uuid {
	private constructor(private uuid_str: string) {}
	static fromString = (str: string): Uuid => {
		// Add uuild validation
		return new Uuid(str);
	};

	toString = (): string => {
		return new Uuid(this.uuid_str).uuid_str;
	};
}

// TODO: Use proper encoding/decoding
const scalarsCustom = ZeusScalars({
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

const options = { scalars: scalarsCustom };
const query = chain("query", options);
const mutation = chain("mutation", options);
// const subscription = chain("subscription", options);

export const graphqlApi = {
	query,
	mutation,
	subscription,
};
