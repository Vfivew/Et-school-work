import { type Knex } from "knex";

const TABLE_NAME = "events";
const TITLE_MAXIMUM_LENGTH = 70;

const ColumnName = {
	CREATED_AT: "created_at",
	DESCRIPTION: "description",
	EVENT_DATE: "event_date",
	ID: "id",
	ORGANIZER: "organizer",
	TITLE: "title",
	UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.string(ColumnName.TITLE, TITLE_MAXIMUM_LENGTH).notNullable();
		table.string(ColumnName.DESCRIPTION).notNullable();
		table.dateTime(ColumnName.EVENT_DATE).notNullable();
		table.string(ColumnName.ORGANIZER).notNullable();
		table
			.dateTime(ColumnName.CREATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(ColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
