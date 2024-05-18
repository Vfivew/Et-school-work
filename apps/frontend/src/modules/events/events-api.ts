import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";

import { EventsApiPath } from "./libs/enums/enums.js";
import {
	type EventResponseDto,
	type EventSortDto,
	type EventUserListRequestQueryDto,
	type EventUserRequestDto,
	type EventUserResponseDto,
	type PaginationResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class EventApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.EVENTS, storage });
	}

	public async createUser(
		payload: EventUserRequestDto,
	): Promise<EventResponseDto> {
		const response = await this.load(
			this.getFullEndpoint(EventsApiPath.UPDATE_USERS, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json<EventResponseDto>();
	}

	public async getAllEvents(filter: EventSortDto): Promise<EventResponseDto[]> {
		const response = await this.load(
			this.getFullEndpoint(EventsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: filter,
			},
		);

		return await response.json<EventResponseDto[]>();
	}

	public async getEventUsers(
		filter: EventUserListRequestQueryDto,
	): Promise<PaginationResponseDto<EventUserResponseDto>> {
		const response = await this.load(
			this.getFullEndpoint(EventsApiPath.EVENT, {
				id: filter.eventId.toString(),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query: filter,
			},
		);

		return await response.json<PaginationResponseDto<EventUserResponseDto>>();
	}
}

export { EventApi };
