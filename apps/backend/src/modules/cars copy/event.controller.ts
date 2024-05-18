import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import {
	type EventGetByIdRequestDto,
	type EventService,
	type EventUpdateUserRequestDto,
	type EventUserListRequestQueryDto,
	EventsApiPath,
} from "./events.js";
import { type PaginationRequestDto } from "./libs/types/types.js";
import { eventParametersValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

class EventController extends BaseController {
	private eventService: EventService;

	public constructor(logger: Logger, eventService: EventService) {
		super(logger, APIPath.EVENTS);

		this.eventService = eventService;

		this.addRoute({
			handler: (options) => {
				return this.findAll(
					options as APIHandlerOptions<{
						query: {
							sortBy: string;
							sortOrder: "asc" | "desc"; // typeOff
						};
					}>,
				);
			},
			method: "GET",
			path: EventsApiPath.ROOT,
			// validation: {
			// 	params: eventParametersValidationSchema,
			// },
		});

		this.addRoute({
			handler: (options) => {
				return this.findById(
					options as APIHandlerOptions<{
						params: EventGetByIdRequestDto;
					}>,
				);
			},
			method: "GET",
			path: EventsApiPath.$ID,
			validation: {
				params: eventParametersValidationSchema,
			},
		});

		this.addRoute({
			handler: (options) => {
				return this.findAllUser(
					options as APIHandlerOptions<{
						params: { id: number };
						query: EventUserListRequestQueryDto;
					}>,
				);
			},
			method: "GET",
			path: EventsApiPath.EVENT,
			// validation: {
			// 	params: eventParametersValidationSchema,
			// },
		});

		this.addRoute({
			handler: (options) => {
				return this.update(
					options as APIHandlerOptions<{
						body: EventUpdateUserRequestDto;
					}>,
				);
			},
			method: "PATCH",
			path: EventsApiPath.UPDATE_USERS,
			// validation: {
			// 	body: commentTextValidationSchema,
			// 	params: commentIdParameterValidationSchema,
			// },
		});
	}

	private async findAll(
		options: APIHandlerOptions<{
			query: {
				sortBy: string;
				sortOrder: "asc" | "desc";
			};
		}>,
	): Promise<APIHandlerResponse> {
		const { sortBy, sortOrder } = options.query;

		return {
			payload: await this.eventService.findAll({ sortBy, sortOrder }),
			status: HTTPCode.OK,
		};
	}

	private async findAllUser(
		options: APIHandlerOptions<{
			params: {
				id: number;
			};
			query: {
				search: string | undefined;
			} & PaginationRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		const { count, page, search } = options.query;
		const eventId = options.params.id;
		const parameters = { count, eventId, page, search: search ?? "" };

		return {
			payload: await this.eventService.findAllUsers(parameters),
			status: HTTPCode.OK,
		};
	}

	private async findById(
		options: APIHandlerOptions<{
			params: {
				id: number;
			};
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.eventService.findById(options.params.id),
			status: HTTPCode.OK,
		};
	}

	private async update(
		options: APIHandlerOptions<{
			body: EventUpdateUserRequestDto;
		}>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.eventService.update(
				options.body.eventId,
				options.body,
			),
			status: HTTPCode.OK,
		};
	}
}

export { EventController };
