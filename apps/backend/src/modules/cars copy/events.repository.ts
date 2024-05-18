import { type QueryBuilder } from "objection";

import { RelationName } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { EventEntity } from "./event.entity.js";
import { type EventModel } from "./event.model.js";
import { type EventUserModel } from "./event-users.model.js";
import {
	type EventUserRequestDto,
	type PaginationResponseDto,
} from "./libs/types/types.js";

class EventRepository implements Repository<EventEntity> {
	private eventModel: typeof EventModel;
	private eventUserModel: typeof EventUserModel;
	public constructor(
		eventModel: typeof EventModel,
		eventUserModel: typeof EventUserModel,
	) {
		this.eventModel = eventModel;
		this.eventUserModel = eventUserModel;
	}

	private filterBySearch(
		builder: QueryBuilder<EventModel>,
		search: string,
	): void {
		void builder
			.whereILike("eventUsers.fullName", `%${search}%`)
			.orWhereILike("eventUsers.email", `%${search}%`);
	}

	public async checkIsEmailExist(
		email: string,
		eventId: number,
	): Promise<boolean> {
		const user = await this.eventUserModel
			.query()
			.where({ email, event_id: eventId })
			.first();

		return Boolean(user);
	}

	public async create(entity: EventEntity): Promise<EventEntity> {
		const { description, eventDate, organizer, title } = entity.toNewObject();

		const event = await this.eventModel
			.query()
			.insert({
				description,
				eventDate,
				organizer,
				title,
			})
			.withGraphJoined(`[${RelationName.EVENT_USERS}]`)
			.returning("*")
			.execute();

		return EventEntity.initialize({
			createdAt: event.createdAt,
			description: event.description,
			eventDate: event.eventDate,
			id: event.id,
			organizer: event.organizer,
			title: event.title,
			updatedAt: event.updatedAt,
			users: [],
		});
	}

	public async delete(carId: number): Promise<boolean> {
		return Boolean(await this.eventModel.query().deleteById(carId).execute());
	}

	public async find(userId: number): Promise<EventEntity | null> {
		const event = await this.eventModel
			.query()
			.findById(userId)
			.withGraphJoined(`[${RelationName.EVENT_USERS}]`)
			.execute();

		return event
			? EventEntity.initialize({
					createdAt: event.createdAt,
					description: event.description,
					eventDate: event.eventDate,
					id: event.id,
					organizer: event.organizer,
					title: event.title,
					updatedAt: event.updatedAt,
					users: event.eventUsers,
				})
			: null;
	}

	public async findAll({
		sortBy,
		sortOrder,
	}: {
		sortBy: string;
		sortOrder: "asc" | "desc";
	}): Promise<EventEntity[]> {
		const events = await this.eventModel
			.query()
			.withGraphJoined(`[${RelationName.EVENT_USERS}]`)
			.orderBy(sortBy, sortOrder)
			.execute();

		return events.map((event) => {
			return EventEntity.initialize({
				createdAt: event.createdAt,
				description: event.description,
				eventDate: event.eventDate,
				id: event.id,
				organizer: event.organizer,
				title: event.title,
				updatedAt: event.updatedAt,
				users: event.eventUsers,
			});
		});
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
	}): Promise<PaginationResponseDto<EventEntity>> {
		const { results, total } = await this.eventModel
			.query()
			.withGraphJoined(`[${RelationName.EVENT_USERS}]`)
			.where({
				event_id: eventId,
			})
			.where((builder) => {
				this.filterBySearch(builder, search);
			})
			.page(page, count);

		return {
			items: results.map((event) => {
				return EventEntity.initialize({
					createdAt: event.createdAt,
					description: event.description,
					eventDate: event.eventDate,
					id: event.id,
					organizer: event.organizer,
					title: event.title,
					updatedAt: event.updatedAt,
					users: event.eventUsers,
				});
			}),
			total,
		};
	}

	public async findById(id: number): Promise<EventEntity | null> {
		const event = await this.eventModel
			.query()
			.findById(id)
			.withGraphJoined(`[${RelationName.EVENT_USERS}]`)
			.execute();

		return event
			? EventEntity.initialize({
					createdAt: event.createdAt,
					description: event.description,
					eventDate: event.eventDate,
					id: event.id,
					organizer: event.organizer,
					title: event.title,
					updatedAt: event.updatedAt,
					users: event.eventUsers,
				})
			: null;
	}

	public async update(
		eventId: number,
		user: EventUserRequestDto,
	): Promise<EventEntity | null> {
		const { dateOfBirth, email, fullName, source } = user;

		await this.eventUserModel
			.query()
			.insert({
				dateOfBirth,
				email,
				eventId,
				fullName,
				source,
			})
			.execute();

		const event = await this.eventModel
			.query()
			.findById(eventId)
			.withGraphJoined(`[${RelationName.EVENT_USERS}]`)
			.execute();

		return event
			? EventEntity.initialize({
					createdAt: event.createdAt,
					description: event.description,
					eventDate: event.eventDate,
					id: event.id,
					organizer: event.organizer,
					title: event.title,
					updatedAt: event.updatedAt,
					users: event.eventUsers,
				})
			: null;
	}
}

export { EventRepository };
