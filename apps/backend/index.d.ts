import { type FastifyRequest as BaseFastifyRequest } from "fastify";

declare module "fastify" {
	interface FastifyRequest extends BaseFastifyRequest {
		user?: null;
	}
}
