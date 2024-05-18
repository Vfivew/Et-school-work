import { type EventUserRequestDto } from "./event-user-request-dto.type.js";

type EventUpdateUserRequestDto = EventUserRequestDto & {
	eventId: number;
};

export { type EventUpdateUserRequestDto };
