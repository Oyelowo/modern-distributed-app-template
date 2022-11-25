import { ZeusScalars } from "./zeus/index.js";
export * from "./zeus/index.js";
import { string } from "zod";

const uuidSchema = string().uuid({ message: "Invalid uuid" });

// TODO: Use proper encoding/decoding
export const scalarsCustom = ZeusScalars({
	UUID: {
		encode: (e: unknown) => uuidSchema.parse(e),
		decode: (e: unknown) => String(e),
	},
	DateTime: {
		decode: (e: unknown) => new Date(e as string),
		encode: (e: unknown) => (e as Date).toISOString(),
	},
});
