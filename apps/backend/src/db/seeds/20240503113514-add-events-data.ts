import { type Knex } from "knex";

const TABLE_NAME = "events";

const ColumnName = {
	CREATED_AT: "created_at",
	DESCRIPTION: "description",
	EVENT_DATE: "event_date",
	ID: "id",
	ORGANIZER: "organizer",
	TITLE: "title",
	UPDATED_AT: "updated_at",
} as const;

const MagicNumber = {
	LENGHT: 20,
	STEP_ONE: 1,
} as const;

const eventData = Array.from({ length: MagicNumber.LENGHT }, (_, index) => ({
	[ColumnName.DESCRIPTION]: "This is a description for the event.",
	[ColumnName.EVENT_DATE]: new Date(),
	[ColumnName.ORGANIZER]: "Organizer Name",
	[ColumnName.TITLE]: `Event ${index + MagicNumber.STEP_ONE}`,
}));

async function seed(knex: Knex): Promise<void> {
	await knex(TABLE_NAME).insert(eventData);
}

export { seed };
