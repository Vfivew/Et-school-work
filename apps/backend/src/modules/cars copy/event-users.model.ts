import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { EventModel } from "./event.model.js";

class EventUserModel extends AbstractModel {
	public static relationMappings = (): RelationMappings => {
		return {
			eventUsers: {
				join: {
					from: `${DatabaseTableName.EVENT_USERS}.event_id`,
					to: `${DatabaseTableName.EVENTS}.id`,
				},
				modelClass: EventModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	};

	public dateOfBirth!: string;

	public email!: string;

	public eventId!: number;

	public fullName!: string;

	public source!: string;

	public static override get tableName(): string {
		return DatabaseTableName.EVENT_USERS;
	}
}

export { EventUserModel };
