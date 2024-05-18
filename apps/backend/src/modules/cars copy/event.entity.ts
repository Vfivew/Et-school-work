import { type Entity } from "~/libs/types/types.js";

import { type EventUserModel } from "./event-users.model.js";

class EventEntity implements Entity {
	private createdAt: string;

	private description: string;

	private eventDate: string;

	private id: null | number;

	private organizer: string;

	private title: string;

	private updatedAt: string;

	private users: EventUserModel[];

	private constructor({
		createdAt,
		description,
		eventDate,
		id,
		organizer,
		title,
		updatedAt,
		users,
	}: {
		createdAt: string;
		description: string;
		eventDate: string;
		id: null | number;
		organizer: string;
		title: string;
		updatedAt: string;
		users: EventUserModel[];
	}) {
		this.description = description;
		this.createdAt = createdAt;
		this.id = id;
		this.eventDate = eventDate;
		this.title = title;
		this.organizer = organizer;
		this.updatedAt = updatedAt;
		this.users = users;
	}

	public static initialize({
		createdAt,
		description,
		eventDate,
		id,
		organizer,
		title,
		updatedAt,
		users,
	}: {
		createdAt: string;
		description: string;
		eventDate: string;
		id: null | number;
		organizer: string;
		title: string;
		updatedAt: string;
		users: EventUserModel[];
	}): EventEntity {
		return new EventEntity({
			createdAt,
			description,
			eventDate,
			id,
			organizer,
			title,
			updatedAt,
			users,
		});
	}

	public static initializeNew({
		description,
		eventDate,
		organizer,
		title,
	}: {
		description: string;
		eventDate: string;
		organizer: string;
		title: string;
	}): EventEntity {
		return new EventEntity({
			createdAt: "",
			description,
			eventDate,
			id: null,
			organizer,
			title,
			updatedAt: "",
			users: [],
		});
	}

	public toNewObject(): {
		createdAt: string;
		description: string;
		eventDate: string;
		id: null | number;
		organizer: string;
		title: string;
		updatedAt: string;
		users: EventUserModel[];
	} {
		return {
			createdAt: this.createdAt,
			description: this.description,
			eventDate: this.eventDate,
			id: this.id,
			organizer: this.organizer,
			title: this.title,
			updatedAt: this.updatedAt,
			users: this.users,
		};
	}

	public toObject(): {
		createdAt: string;
		description: string;
		eventDate: string;
		id: number;
		organizer: string;
		title: string;
		updatedAt: string;
		users: EventUserModel[];
	} {
		return {
			createdAt: this.createdAt,
			description: this.description,
			eventDate: this.eventDate,
			id: this.id as number,
			organizer: this.organizer,
			title: this.title,
			updatedAt: this.updatedAt,
			users: this.users,
		};
	}
}

export { EventEntity };
