import { logger } from "~/libs/modules/logger/logger.js";

import { EventController } from "./event.controller.js";
import { EventModel } from "./event.model.js";
import { EventService } from "./event.service.js";
import { EventUserModel } from "./event-users.model.js";
import { EventRepository } from "./events.repository.js";

const eventRepository = new EventRepository(EventModel, EventUserModel);
const eventService = new EventService(eventRepository);
const eventController = new EventController(logger, eventService);

export { eventController };
export { type EventService } from "./event.service.js";
export { EventsApiPath } from "./libs/enums/enums.js";
export {
	type EventGetByIdRequestDto,
	type EventUpdateUserRequestDto,
	type EventUserListRequestQueryDto,
} from "./libs/types/types.js";
