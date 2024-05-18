import { type Knex } from "knex";

const TABLE_NAME = "event_users";
const EMAIL_MAXIMUM_LENGTH = 71;

const ColumnName = {
	CREATED_AT: "created_at",
	DATE_OF_BIRTH: "date_of_birth",
	EMAIL: "email",
	EVENT_ID: "event_id",
	FULL_NAME: "full_name",
	ID: "id",
	SOURCE: "source",
	UPDATED_AT: "updated_at",
} as const;

async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(TABLE_NAME, (table) => {
		table.increments(ColumnName.ID).primary();
		table.integer(ColumnName.EVENT_ID).references("id").inTable("events");
		table.string(ColumnName.EMAIL, EMAIL_MAXIMUM_LENGTH).notNullable();
		table.text(ColumnName.FULL_NAME).notNullable();
		table.text(ColumnName.SOURCE).notNullable();
		table.dateTime(ColumnName.DATE_OF_BIRTH).notNullable();
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
