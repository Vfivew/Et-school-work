import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { EventUserModel } from "./event-users.model.js";

class EventModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			eventUsers: {
				join: {
					from: `${DatabaseTableName.EVENTS}.id`,
					to: `${DatabaseTableName.EVENT_USERS}.event_id`,
				},
				modelClass: EventUserModel,
				relation: Model.HasManyRelation,
			},
		};
	};

	public description!: string;

	public eventDate!: string;

	public eventUsers!: EventUserModel[];

	public organizer!: string;

	public title!: string;

	public static override get tableName(): string {
		return DatabaseTableName.EVENTS;
	}
}

export { EventModel };
