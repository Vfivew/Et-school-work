import { MagicNumber } from "~/libs/enums/enums.js";
import { convertPageToZeroIndexed } from "~/libs/helpers/helpers.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";

import { EventEntity } from "./event.entity.js";
import { type EventRepository } from "./events.repository.js";
import { EventErrorMessage } from "./libs/enums/enums.js";
import { EventError } from "./libs/exceptions/exceptions.js";
import {
	type EventRequestDto,
	type EventResponseDto,
	type EventUserRequestDto,
	type EventUserResponseDto,
	type PaginationResponseDto,
} from "./libs/types/types.js";

class EventService implements Service {
	private eventRepository: EventRepository;

	public constructor(eventRepository: EventRepository) {
		this.eventRepository = eventRepository;
	}

	public async create(payload: EventRequestDto): Promise<EventResponseDto> {
		const event = await this.eventRepository.create(
			EventEntity.initializeNew({
				description: payload.description,
				eventDate: payload.eventDate,
				organizer: payload.organizer,
				title: payload.title,
			}),
		);

		return event.toObject();
	}

	public async delete(eventId: number): Promise<boolean> {
		const event = await this.eventRepository.find(eventId);

		if (!event) {
			throw new EventError({
				message: EventErrorMessage.EVENT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return await this.eventRepository.delete(eventId);
	}

	public async find(eventId: number): Promise<EventResponseDto | null> {
		const event = await this.eventRepository.find(eventId);

		return event?.toObject() ?? null;
	}

	public async findAll({
		sortBy,
		sortOrder,
	}: {
		sortBy: string;
		sortOrder: "asc" | "desc";
	}): Promise<EventResponseDto[]> {
		const events = await this.eventRepository.findAll({ sortBy, sortOrder });

		return events.map((event) => event.toObject());
	}

	public async findAllUsers({
		count,
		eventId,
		page,
		search,
	}: {
		count: number;
		eventId: number;
		page: number;
		search: string;
	}): Promise<PaginationResponseDto<EventUserResponseDto>> {
		const { items, total } = await this.eventRepository.findAllUsers({
			count,
			eventId,
			page: convertPageToZeroIndexed(page),
			search,
		});
		const result = items.map((user) => user.toObject());

		return {
			items: result[MagicNumber.FIRST_ARRAY_ELEMENT]?.users || [],
			total,
		};
	}

	public async findById(eventId: number): Promise<EventResponseDto | null> {
		const event = await this.eventRepository.findById(eventId);

		if (!event) {
			throw new EventError({
				message: EventErrorMessage.EVENT_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return event.toObject();
	}

	public async update(
		eventId: number,
		user: EventUserRequestDto,
	): Promise<EventResponseDto | null> {
		const { dateOfBirth, email, fullName, source } = user;

		const isEmailExist = await this.eventRepository.checkIsEmailExist(
			email,
			eventId,
		);

		if (isEmailExist) {
			throw new EventError({
				message: EventErrorMessage.EMAIL_ALREADY_TAKEN,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const updateEvent = await this.eventRepository.update(eventId, {
			dateOfBirth,
			email,
			fullName,
			source,
		});

		return updateEvent?.toObject() ?? null;
	}
}

export { EventService };
